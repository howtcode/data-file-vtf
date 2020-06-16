const {
	max,
	sqrt
} = Math;

/**
 *
 */
class CompressedData {
	static type;

	static blockBytes;

	data;

	width;

	height;

	/**
	 * @param inputData
	 * @param width
	 * @param height
	 * @example
	 */
	constructor(inputData, width, height) {
		const {
			constructor: {
				type,
				name
			}
		} = this;

		this.data = Uint8Array.from(inputData);

		if (type === "bc") {
			const {
				constructor: {
					blockBytes
				},
				data,
				data: {
					length
				}
			} = this;

			if (length > blockBytes) {
				this.width = width || 4 * sqrt(length / blockBytes);
				this.height = height || (16 * length) / (this.width * blockBytes);
			}
			else if (new Uint32Array(data.buffer).reverse()[0] === (2 ** 32) - 1) {
				this.width = 1;
				this.height = 1;
			}
			else if (new Uint16Array(data.buffer).reverse()[0] === (2 ** 16) - 1) {
				this.width = 2;
				this.height = 2;
			}
			else {
				this.width = 4;
				this.height = 4;
			}

			if (
				length !==
					(1 / 16) *
					blockBytes *
					max(4, this.width) *
					max(4, this.height)
			) {
				throw new Error(`Failed to construct '${name}': The input data byte length doesn't equal (blockBytes * max(4, this.width) * max(4, this.width)) / 16.`);
			}
		}
	}
}

export default CompressedData;
