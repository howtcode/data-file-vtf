import formats from "../vtf/formats.js"; // with type: "json";
import {
	BC1Data
} from "../formats/compressed/bc.js";

import defaultFlags from "./vtf/flags.js"; // with type: "json";
import Mask from "./utils/mask.js";
import stringToCharcodes from "./utils/string-to-charcodes.js";
import zeros from "./utils/zeros.js";

const mask = new Mask(defaultFlags.map(({
	key, defaultValue
}) => [key, defaultValue]));

const {
	max,
	ceil
} = Math;

class VTFHeader {
	static assemble = async(
		input,
		{
			width,
			height,
			maxSize = max(width, height),
			flags = {},
			reflectivity = [
				0.1,
				0.1,
				0.1
			],

			bumpMapScale = 1,
			format = "dxt5",
			mipmapCount = max(width, height).toString(2).length,
			lowResImage = {
				format: "dxt1",
				height: ceil((16 * width) / maxSize),
				width: ceil((16 * height) / maxSize)
			},
			depth = 1,
			numResources = 3
		}
	) => {
		mask.flags = flags;

		const {
			format: lowResImageFormat,
			width: lowResImageWidth,
			height: lowResImageHeight
		} = lowResImage;

		console.log(input);
		console.log(await input.resize(lowResImageWidth, lowResImageHeight));
		console.log(BC1Data.from(input));

		const resourceData = [
			{
				flags: 0,
				offset: 104,
				tag: stringToCharcodes("\x01\0\0")
			},
			{
				flags: 0,
				offset: 232,
				tag: stringToCharcodes("\x30\0\0")
			},
			{
				flags: 2,
				tag: stringToCharcodes("CRC")
			}
		];

		const resources = resourceData
			.map(({
				tag,
				flags: resourceFlags,
				offset
			}) => [
				...tag,
				resourceFlags,
				[offset, ...zeros(3)]
			]
				.filter((value) => !(Array.isArray(value) && value[0] === undefined)))
			.flat(2);

		const array = [
			...stringToCharcodes("VTF"),
			0,
			7,
			...zeros(3),
			5,
			...zeros(3),
			104,
			...zeros(3),
			...new Uint8Array(Uint16Array.of(width).buffer),
			...new Uint8Array(Uint16Array.of(height).buffer),
			...new Uint8Array(Uint32Array.of(mask.value).buffer),
			1,
			...zeros(7),
			...new Uint8Array(Float32Array.of(...reflectivity).buffer),
			...zeros(4),
			...new Uint8Array(Float32Array.of(bumpMapScale).buffer),
			formats.indexOf(format),
			...zeros(3),
			mipmapCount,
			formats.indexOf(lowResImageFormat),
			...zeros(3),
			lowResImageWidth,
			lowResImageHeight,
			depth,
			...zeros(4),
			resourceData.length,
			...zeros(11),
			...resources,
			// TODO: find out what these four numbers mean
			152,
			238,
			128,
			241,
			...BC1Data.from(await input.resize(lowResImageWidth, lowResImageHeight)).data
		];

		return Uint8Array.from(array);
	}
}

export default VTFHeader;
