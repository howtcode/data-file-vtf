import CompressedData from "../../compressed.js";

/**
 *
 *
 * @class BC3Data
 * @augments {CompressedData}
 */
class BC3Data extends CompressedData {
	static type = "bc"

	static blockBytes = 16;
}

export default BC3Data;
