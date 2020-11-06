//

import {
	promises as fs
} from "fs";
import path from "path";

import FileType from "file-type";
import Jimp from "jimp";
import webp from "@saschazar/wasm-webp";
import webpOptions from "@saschazar/wasm-webp/options.js";
import TGA from "tga";

import {
	toRgba
} from "../vtf.js";
import rgbaToRgb from "../utils/to-rgb/rgba.js";

/**
 *
 */
class ImageFile {
	/**
	 * @private
	 */
	#normalize = async() => {
		if (this.type.mime === "image/vnd.valve.source.texture") {
			const mipmaps = await toRgba(this.rawData);

			const biggestMipmap = mipmaps[0];

			const {
				data,
				width,
				height
			} = biggestMipmap;

			this.buffer = data.data;
			this.width = width;
			this.height = height;
		}
	}

	/**
	 * @param {string} [outputPath]
	 * @example
	 */
	write = async(outputPath = this.outputPath) => {
		this.outputPath = path.resolve(outputPath);

		const extension = this.outputPath.split(".").pop()
			.toLocaleLowerCase();

		const {
			width,
			height,
			buffer
		} = this;

		const image = new Jimp({
			data: buffer,
			height,
			width
		});

		if ([
			"jpg",
			"jpeg",
			"jpe",
			"png",
			"bmp",
			"dib",
			"tiff",
			"tif",
			"gif"
		].includes(extension)) {
			image.write(this.outputPath);
		}
		else if (extension === "webp") {
			const webpModule = await new Promise((resolve) => {
				const wasm = webp({
					noInitialRun: true,
					onRuntimeInitialized() {
						const {
							then,
							...other
						} = wasm;
						resolve(other);
					}
				});
			});

			const options = {
				...webpOptions,
				exact: 1,
				lossless: 1
			};

			const result = webpModule.encode(buffer, width, height, 4, options); // encode image data and return a new Uint8Array

			await fs.writeFile(this.outputPath, result);

			webpModule.free(); // clean up memory after encoding is done
		}
		else if (extension === "tga") {
			await fs.writeFile(this.outputPath, TGA.createTgaBuffer(width, height, buffer));
		}
		else if (extension === "raw") {
			await fs.writeFile(this.outputPath, buffer);
		}
	}

	/**
	 * @param inputPath
	 * @example
	 */
	constructor(inputPath) {
		this.inputPath = path.resolve(inputPath);

		return (async() => {
			this.rawData = Uint8Array.from(await fs.readFile(this.inputPath));

			this.type = await FileType.fromBuffer(this.rawData);

			if (!this.type) {
				if (this.inputPath.split(".").pop() === "vtf") {
					this.type = {
						ext: "vtf",
						mime: "image/vnd.valve.source.texture"
					};
				}
			}

			await this.#normalize();

			return this;
		})();
	}
}

export default ImageFile;
