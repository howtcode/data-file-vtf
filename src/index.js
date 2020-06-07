import {
	promises as fs
} from "fs";

import decodeDxt from "decode-dxt";
import Jimp from "jimp";
// import dxt from "dxt-js";

import ImageFile from "./classes/image-file.js";
import ColorArray from "./classes/color-array.js";

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
