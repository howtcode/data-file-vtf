import CompressedData from "../../compressed.js";

/**
 *
 *
 * @class BC1Data
 * @augments {CompressedData}
 */
class BC1Data extends CompressedData {
	static type = "bc"

	static blockBytes = 8;
}

export default BC1Data;
