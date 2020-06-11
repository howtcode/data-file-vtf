import ColorArray from "../classes/color-array.js";

const {
	sqrt
} = Math;
/**
 *
 */
class UncompressedData {
	static channels;

	data;

	width;

	height;

	/**
	 * @param data
	 * @param width
	 * @param height
	 * @example
	 */
	constructor(data, width, height) {
		const {
			constructor: {
				channels,
				name
			}
		} = this;

		const {
			length
		} = data;

		this.data = ColorArray.from(data);

		this.width = width || sqrt(length / channels);
		this.height = height || length / (channels * this.width);

		if (length !== this.width * this.height * channels) {
			throw new Error(`Failed to construct '${name}': The input data byte length is not a multiple of ${channels}.`);
		}
	}
}

export default UncompressedData;
