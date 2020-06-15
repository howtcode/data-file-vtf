import {
	promises as fs
} from "fs";

import Jimp from "jimp";
// import dxt from "dxt-js";

import ow from "ow";
import is from "@sindresorhus/is";

import ImageFile from "./classes/image-file.js";
import ColorArray from "./classes/color-array.js";

const converter = (input, output, options) => {
	ow(
		input,
		ow.any(
			ow.string.nonEmpty,
			ow.dataView,
			ow.typedArray.minLength(1),
			ow.arrayBuffer,
			ow.sharedArrayBuffer,
			ow.buffer,
			ow.object.instanceOf(URL),
			ow.object.instanceOf(ImageData),
			ow.object.instanceOf(ImageBitmap),
			ow.object.instanceOf(Blob),
			ow.object.instanceOf(File),
			ow.object.instanceOf(FileList),
			ow.object.instanceOf(FileReader),
			ow.object.instanceOf(HTMLImageElement),
			ow.object.instanceOf(HTMLVideoElement),
			ow.object.instanceOf(HTMLPictureElement),
			ow.object.instanceOf(HTMLSourceElement),
			ow.object.instanceOf(HTMLCanvasElement),
			ow.object.instanceOf(CanvasRenderingContext2D),
			ow.object.instanceOf(SVGElement),
			ow.object.instanceOf(ReadableStream)
		)
	);
};

/**
 * @param inputPath
 * @param outputPath
 * @example
 */
const imageToVtf = (inputPath, outputPath) => {
	// do something

	Jimp.read(inputPath, (error, image) => {

	});

	// const compressed = dxt.compress(image.bitmap.data, biggestMipmap.width, biggestMipmap.height, dxt.flags.DXT5);

	// console.log(compressed);

	return 0;
};

// imageToVtf("./test.bmp", "./test.vtf");

// /Volumes/hdd2/csgo/weapons/customization/paints/gunsmith/awp_gungnir.vtf

/**
 * @param inputPath
 * @param outputPath
 * @example
 */
const vtfToImage = async(inputPath, outputPath) => {
	const imageFile = await new ImageFile(inputPath);

	await imageFile.write(outputPath);
};

vtfToImage("/Volumes/hdd1/csgo/materials/models/weapons/customization/paints/custom/ak_island_floral.vtf", "./test.bmp");

export default vtfToImage;
