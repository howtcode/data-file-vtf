import Jimp from "jimp";

import VTFHeader from "../headers/vtf.js";
import ColorArray from "../classes/color-array.js";

import parseHeader from "./to-rgba/parse-header.js";
import getMipmap from "./to-rgba/get-mipmap.js";

/**
 * @param data
 * @example
 */
export default async(data) => {
	const bufferStart = data.slice(0, 200);

	const header = parseHeader(bufferStart);

	console.log(header);

	const {
		lowResImage: {
			width: lowResImageWidth,
			height: lowResImageHeight,
			format: lowResImageFormat
		},
		size,
		mipmapCount,
		format,
		width,
		height
	} = header;

	const ddsHeader = Buffer.from([
		"DDS ",
		124,
		(4 * width * width) + (7 / 8),
		width,
		height,
		0,
		0,
		mipmapCount - 1,
		...Array(12).fill(0),
		5,
		format.toLocaleUpperCase(),
		32,
		...Array(4).fill()
			.map((value, index) => ((2 ** 8) - 1) * (2 ** (8 * index)))
			.reverse(),
		2 ** 12,
		0,
		0,
		0
	].map((value) => {
		if (typeof value !== "string") {
			return String.fromCharCode(
				value & 0xff,
				(value >> 8) & 0xff,
				(value >> 16) & 0xff,
				(value >> 24) & 0xff
			);
		}

		return value;
	}).join(""));

	const lowResOffset = 104;

	let lowResMipmap = {
		data: Buffer.alloc(0),
		rawData: Buffer.alloc(0)
	};

	if (lowResImageHeight) {
		lowResMipmap = getMipmap(
			data,
			lowResOffset,
			lowResImageFormat,
			lowResImageWidth,
			lowResImageHeight
		);
	}

	const image = new Jimp({
		data: lowResMipmap.data.data,
		height: 16,
		width: 16
	});

	image.write("./test2.bmp");

	console.log(lowResMipmap.data.data);

	const highResOffset = size + lowResMipmap.rawData.length;

	let offset = highResOffset;
	let mipmapWidth = width >> (mipmapCount - 1);
	let mipmapHeight = height >> (mipmapCount - 1);

	const mipmaps = [];

	for (let index = 0; index < mipmapCount; index++) {
		const map = getMipmap(data, offset, format, mipmapWidth, mipmapHeight);

		mipmaps.push(map);

		offset += map.rawData.length;

		mipmapWidth <<= 1;
		mipmapHeight <<= 1;
	}

	const biggestMipmap = mipmaps.reverse()[5];

	console.log(await VTFHeader.assemble(
		biggestMipmap.data,
		{
			flag: 8192,
			height,
			reflectivity: ColorArray.from(data).slicePixel32(0, 3)
				.normalizedMean24(2.2),
			width
		}
	));

	// const rawMipMapsBufferReversed = Buffer.concat(mipmaps.reverse().map((map) => map.rawData));

	// await fs.writeFile("./test.dds", Buffer.concat([ddsHeader, rawMipMapsBufferReversed]));

	return mipmaps.reverse();
};
