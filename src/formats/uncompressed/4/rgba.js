import decodeDxt from "decode-dxt";

import UncompressedData from "../../uncompressed.js";
import ColorArray from "../../../classes/color-array.js";
import UnsupportedConversionError from "../../../errors/unsupported-conversion.js";
import {
	ABGRData,
	ARGBData,
	BGRAData
} from "../4.js";
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

/**
 *
 *
 * @class RGBAData
 * @augments {UncompressedData}
 */
class RGBAData extends UncompressedData {
	static channels = 4;

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
			data: {
				buffer
			},
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
						console.log("RGBA");
						console.log(input);
						newData = decodeDxt(new DataView(buffer), width, height, "dxt1");
						console.log(newData);
						break;
					case BC2Data:
						newData = decodeDxt(new DataView(buffer), width, height, "dxt3");
						break;
					case BC3Data:
						newData = decodeDxt(new DataView(buffer), width, height, "dxt5");
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
