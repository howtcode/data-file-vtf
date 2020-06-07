/**
 *
 */
class UnsupportedConversionError extends Error {
	/**
	 * @param {string} input
	 * @param {string} output
	 * @example
	 */
	constructor(input, output) {
		if (input && output) {
			super(`Unsupported conversion: ${input} > ${output}`);
		}
		else {
			super("Unsupported conversion.");
		}

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, UnsupportedConversionError);
		}
	}
}

export default UnsupportedConversionError;
