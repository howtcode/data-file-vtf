import UncompressedData from "../../uncompressed.js";
import ColorArray from "../../../classes/color-array.js";
import UnsupportedConversionError from "../../../errors/unsupported-conversion.js";

import BGRData from "./bgr.js";

/**
 *
 *
 * @class RGBData
 * @augments {UncompressedData}
 */
class RGBData extends UncompressedData {
	static channels = 3;

	/**
	 * @param {UncompressedData} input
	 * @returns {RGBAData}
	 * @example
	 */
	static from = (input) => {
		const {
			constructor,
			constructor: {
				channels,
				name
			},
			data
		} = input;

		const colorArray = new ColorArray(data);

		let newData = new RGBData(Array(3).fill(0));

		switch (channels) {
			case 3:
				switch (constructor) {
					case BGRData:
						newData = colorArray.swap24();
						break;
					default:
						throw new UnsupportedConversionError(name, this.constructor.name);
				}

				break;
			default:
				throw new UnsupportedConversionError(name, this.constructor.name);
		}

		return new RGBData(newData);
	}
}

export default RGBData;
