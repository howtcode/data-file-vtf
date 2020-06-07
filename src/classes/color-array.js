import {
	inspect
} from "util";

import chalk from "chalk";

const {
	custom
} = inspect;

const BITS = 8;

const BITRANGE = [0, (2 ** BITS) - 1];

/**
 * A buffer with swapping features.
 *
 * @class
 * @example
 * const array = new ColorArray(Array.from([
 * 	0,
 * 	0,
 * 	0
 * ]));
 */
class ColorArray extends Uint8Array {
	/**
	 * @private
	 */
	#swap = (index1, index2) => {
		[this[index1], this[index2]] = [this[index2], this[index1]];
	}

	/**
	 * @private
	 */
	#testArrayLength = (bytesPerValue) => {
		const {
			length
		} = this;

		if (length % bytesPerValue !== 0) {
			throw new RangeError("Array size must be a multiple of 3");
		}
	}

	/**
	 * Interprets buf as an array of unsigned 32-bit integers and swaps the byte order *in-place*.
	 *
	 * @memberof ColorArray
	 * @returns {ColorArray}
	 * A reference to buf.
	 * @example
	 * test;
	 */
	swap24 = () => {
		const {
			length
		} = this;

		const bytesPerValue = 3;

		this.#testArrayLength(bytesPerValue);

		for (let index = 0; index < length; index += bytesPerValue) {
			this.#swap(index, index + bytesPerValue - 1);
		}

		return this;
	}

	/**
	 * Interprets buf as an array of unsigned 32-bit integers and swaps the byte order *in-place*.
	 *
	 * @memberof ColorArray
	 * @returns {ColorArray}
	 * A reference to buf.
	 * @example
	 * test;
	 */
	swap32 = () => {
		Buffer.prototype.swap32.call(this);

		return this;
	}

	/**
	 * @private
	 */
	#popUnshift = (index1, index2) => {
		const {
			set
		} = this;

		set([this[index2], ...this.slice(index1, index2)], index1);
	}

	/**
	 * @private
	 */
	#popUnshiftGeneric = (bytesPerValue, times = 1) => {
		this.#testArrayLength(bytesPerValue);

		const {
			length
		} = this;

		for (let count = 0; count < times; count++) {
			for (let index = 0; index < length; index += bytesPerValue) {
				this.#popUnshift(index, index + bytesPerValue - 1);
			}
		}
	}

	/**
	 * Interprets buf as an array of unsigned 32-bit integers and swaps the byte order *in-place*.
	 *
	 * @memberof ColorArray
	 * @param {number} times - The number of times the shiftpush should be applied.
	 * @returns {ColorArray}
	 * A reference to buf.
	 * @example
	 * test;
	 */
	popUnshift24 = (times) => {
		const bytesPerValue = 3;

		this.#popUnshiftGeneric(bytesPerValue, times);

		return this;
	}

	/**
	 * Interprets buf as an array of unsigned 32-bit integers and swaps the byte order *in-place*.
	 *
	 * @memberof ColorArray
	 * @param {number} times - The number of times the shiftpush should be applied.
	 * @returns {ColorArray}
	 * A reference to buf.
	 * @example
	 * test;
	 */
	popUnshift32 = (times) => {
		const bytesPerValue = 4;

		this.#popUnshiftGeneric(bytesPerValue, times);

		return this;
	}

	/**
	 * @param {number} targetLength
	 * @param {number} padNumber
	 * @returns {ColorArray}
	 * @example
	 */
	padStart8 = (targetLength, padNumber = BITRANGE[1]) => {
		const {
			length
		} = this;

		const bytesPerValue = 1;

		this.#testArrayLength(bytesPerValue);

		const newArray = new ColorArray((length / bytesPerValue) * targetLength);

		const addition = Array(targetLength - bytesPerValue).fill(padNumber);

		for (let index = 0; index < length; index += bytesPerValue) {
			newArray.set(
				[...addition, ...this.slice(index, bytesPerValue)],
				(index / bytesPerValue) + index
			);
		}

		return newArray;
	}

	/**
	 * @param {number} targetLength
	 * @param {number} padNumber
	 * @returns {ColorArray}
	 * @example
	 */
	padEnd24 = (targetLength, padNumber = BITRANGE[1]) => {
		const {
			length
		} = this;

		const bytesPerValue = 3;

		this.#testArrayLength(bytesPerValue);

		const newArray = new ColorArray((length / bytesPerValue) * targetLength);

		const addition = Array(targetLength - bytesPerValue).fill(padNumber);

		for (let index = 0; index < length; index += bytesPerValue) {
			newArray.set(
				[...this.slice(index, bytesPerValue), ...addition],
				(index / bytesPerValue) + index
			);
		}

		return newArray;
	}

	/**
	 * @param {number} targetLength
	 * @returns {ColorArray}
	 * @example
	 */
	repeatStart16 = (targetLength) => {
		const {
			length
		} = this;

		const bytesPerValue = 2;

		this.#testArrayLength(bytesPerValue);

		const newArray = new ColorArray((length / bytesPerValue) * targetLength);

		for (let index = 0; index < length; index += bytesPerValue) {
			const addition = Array(targetLength - bytesPerValue).fill(this[index]);

			newArray.set(
				[...addition, ...this.slice(index, bytesPerValue)],
				(index / bytesPerValue) + index
			);
		}

		return newArray;
	}

	/**
	 * @param {number} targetLength
	 * @returns {ColorArray}
	 * @example
	 */
	repeat8 = (targetLength) => {
		const {
			length
		} = this;

		const bytesPerValue = 1;

		this.#testArrayLength(bytesPerValue);

		const newArray = new ColorArray((length / bytesPerValue) * targetLength);

		for (let index = 0; index < length; index += bytesPerValue) {
			newArray.set(
				Array(targetLength).fill(this[index]),
				(index / bytesPerValue) + index
			);
		}

		return newArray;
	}

	/**
	 * @param {*} start
	 * @param {*} end
	 * @returns
	 * @example
	 */
	slicePixel32 = (start, end) => {
		const bytesPerValue = 4;

		this.#testArrayLength(bytesPerValue);

		return this.filter(
			(channel, index) => index % bytesPerValue >= start && index % bytesPerValue < end
		);
	}

	/**
	 * @param {*} bytesPerValue
	 * @param {number} [power]
	 * @returns
	 * @example
	 */
	#normalizedMean = (bytesPerValue, power = 2) => {
		const {
			length
		} = this;

		const channelLength = length / bytesPerValue;

		return Float32Array.from(this)
			.map((value) => (value / BITRANGE[1]) ** power)
			.reduce(
				(previous, current, index) => previous.map(
					(channel, channelIndex) => channel +
						(index % bytesPerValue === channelIndex ? current / channelLength : 0)
				),
				Array(bytesPerValue).fill(0)
			);
	}

	/**
	 * @param {number} [power]
	 * @returns
	 * @example
	 */
	normalizedMean24 = (power = 2) => {
		const bytesPerValue = 3;

		this.#testArrayLength(bytesPerValue);

		return this.#normalizedMean(bytesPerValue, power);
	}

	/**
	 * @param {number} [power]
	 * @returns
	 * @example
	 */
	normalizedMean32 = (power = 2) => {
		const bytesPerValue = 4;

		this.#testArrayLength(bytesPerValue);

		return this.#normalizedMean(bytesPerValue, power);
	}

	/**
	 * @param depth
	 * @param options
	 * @example
	 */
	[custom] = (depth, options) => {
		const {
			stylize
		} = options;

		const start = Array.from(this.slice(0, 200));

		const base = Array.from(start)
			.map((number) => String(number).padStart(4));

		let stylizedArray = base;

		if (this.length % 3 === 0 && this.length % 4 !== 0) {
			stylizedArray = base.slice(0, 96)
				.map((string, index) => {
					if (index % 3 === 0) {
						return chalk.red(string);
					}

					if ((index - 1) % 3 === 0) {
						return chalk.green(string);
					}

					if ((index - 2) % 3 === 0) {
						return chalk.blue(string);
					}
				});
		}

		if (this.length % 4 === 0 && this.length % 3 !== 0) {
			stylizedArray = base.slice(0, 128)
				.map((string, index) => {
					if (index % 4 === 0) {
						return chalk.red(string);
					}

					if ((index - 1) % 4 === 0) {
						return chalk.green(string);
					}

					if ((index - 2) % 4 === 0) {
						return chalk.blue(string);
					}

					return chalk.gray(string);
				});
		}

		const formattedArray = stylizedArray
			.map((string, index) => (index % 12 === 0 ? `\n${string},` : `${string},`));

		const stylizedString = formattedArray.join("");

		return `ColorArray(${this.length}) [${stylizedString} ... ${this.length - stylizedArray.length} more items\n]`;
	}
}

// Object.setPrototypeOf(ColorArray.prototype, Buffer.from([]).constructor.prototype);

export default ColorArray;
