import BC from "@howt/compression-bc";
import sharp from "sharp";

import UncompressedData from "../../uncompressed.js";
import ColorArray from "../../../classes/color-array.js";
import UnsupportedConversionError from "../../../errors/unsupported-conversion.js";
import {
	BGRData,
	RGBData
} from "../3.js";
import {
	IAData
} from "../2.js";
import {
	IData,
	AData
} from "../1.js";
import CompressedData from "../../compressed.js";
import {
	BC1Data, BC2Data, BC3Data
} from "../../compressed/bc.js";

import BGRAData from "./bgra.js";
import ARGBData from "./argb.js";
import ABGRData from "./abgr.js";

const {
	floor,
	ceil,
	min,
	max
} = Math;
/**
 * @param newWidth
 * @param newHeight
 * @class RGBAData
 * @augments {UncompressedData}
 * @example
 */
class RGBAData extends UncompressedData {
	static channels = 4;

	resize = async(newWidth, newHeight = newWidth) => {
		const {
			width,
			height,
			data,
			constructor: {
				channels
			}
		} = this;

		return new RGBAData(
			await sharp(
				Buffer.from(data),
				{
					raw: {
						channels,
						height,
						width
					}
				}
			)
				.resize({
					fit: "fill",
					height: newHeight,
					width: newWidth
				})
				.raw()
				.toBuffer()
		);
	}

	/**
	 * @param {CompressedData} input
	 * @returns {RGBAData}
	 * @example
	 */
	static #fromCompressedData = (input) => {
		const {
			constructor,
			constructor: {
				type,
				name: inputName
			},
			data,
			width,
			height
		} = input;

		const {
			channels,
			name
		} = this;

		let newData = new Uint8Array(0);

		switch (type) {
			case "bc":
				switch (constructor) {
					case BC1Data:
						newData = BC.decompress(data, width, height, 1);
						break;
					case BC2Data:
						newData = BC.decompress(data, width, height, 2);
						break;
					case BC3Data:
						newData = BC.decompress(data, width, height, 3);
						break;
					default:
						throw new UnsupportedConversionError(inputName, name);
				}

				break;
			default:
				throw new UnsupportedConversionError(inputName, name);
		}

		return new RGBAData(newData);
	}

	/**
	 * @param {UncompressedData} input
	 * @returns {RGBAData}
	 * @example
	 */
	static #fromUncompressedData = (input) => {
		const {
			constructor,
			constructor: {
				channels: inputChannels,
				name: inputName
			},
			data
		} = input;

		const {
			channels,
			name
		} = this;

		const colorArray = new ColorArray(data);

		let newData = new RGBAData(Array(channels).fill(0));

		switch (inputChannels) {
			case 4:
				switch (constructor) {
					case RGBAData:
						newData = colorArray;
						break;
					case ABGRData:
						newData = colorArray.swap32();
						break;
					case ARGBData:
						newData = colorArray.popUnshift32(3);
						break;
					case BGRAData:
						newData = colorArray.popUnshift32(3).swap32();
						break;
					default:
						throw new UnsupportedConversionError(inputName, name);
				}

				break;
			case 3:
				switch (constructor) {
					case RGBData:
						newData = colorArray.padEnd24(channels);
						break;
					case BGRData:
						newData = colorArray.swap24().padEnd24(channels);
						break;
					default:
						throw new UnsupportedConversionError(inputName, name);
				}

				break;
			case 2:
				switch (constructor) {
					case IAData:
						newData = colorArray.repeatStart16(channels);
						break;
					default:
						throw new UnsupportedConversionError(inputName, name);
				}

				break;
			case 1:
				switch (constructor) {
					case IData:
						newData = colorArray.repeat8(3).padEnd24(channels);
						break;
					case AData:
						newData = colorArray.padStart8(channels);
						break;
					default:
						throw new UnsupportedConversionError(inputName, name);
				}

				break;
			default:
				throw new UnsupportedConversionError(inputName, name);
		}

		return new RGBAData(newData);
	}

	/**
	 * @param {UncompressedData | CompressedData} input
	 * @returns {RGBAData}
	 * @example
	 */
	static from = (input) => {
		if (input instanceof UncompressedData) {
			return this.#fromUncompressedData(input);
		}

		return this.#fromCompressedData(input);
	}
}

export default RGBAData;
