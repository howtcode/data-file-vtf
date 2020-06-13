import BC from "@howt/compression-bc";

import CompressedData from "../../compressed.js";
import UncompressedData from "../../uncompressed.js";
import UnsupportedConversionError from "../../../errors/unsupported-conversion.js";
import {
	RGBAData
} from "../../uncompressed/4.js";

import BC2Data from "./bc2.js";
import BC3Data from "./bc3.js";

/**
 * @class BC1Data
 * @augments {CompressedData}
 * @example
 */
class BC1Data extends CompressedData {
	static type = "bc"

	static blockBytes = 8;

	/**
	 * @param {CompressedData} input
	 * @returns {BC1Data}
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
						newData = data;
						break;
					case BC2Data:
						newData = data
							|> BC.decompress(?, width, height, 2)
							|> BC.compress(?, width, height, 1);
						break;
					case BC3Data:
						newData = data
							|> BC.decompress(?, width, height, 3)
							|> BC.compress(?, width, height, 1);
						break;
					default:
						throw new UnsupportedConversionError(inputName, name);
				}

				break;
			default:
				throw new UnsupportedConversionError(inputName, name);
		}

		return new BC1Data(newData);
	}

	/**
	 * @param {UncompressedData} input
	 * @returns {BC1Data}
	 * @example
	 */
	static #fromUncompressedData = (input) => {
		const {
			width,
			height
		} = input;

		return input
			|> RGBAData.from
			|> ((_) => BC.compress(_.data, width, height, 1))
			|> ((_) => new BC1Data(_));
	}

	/**
	 * @param {UncompressedData | CompressedData} input
	 * @returns {BC1Data}
	 * @example
	 */
	static from = (input) => {
		if (input instanceof UncompressedData) {
			return this.#fromUncompressedData(input);
		}

		return this.#fromCompressedData(input);
	}
}

export default BC1Data;
