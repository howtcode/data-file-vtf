import CompressedData from "../../compressed.js";

/**
 *
 *
 * @class BC2Data
 * @augments {CompressedData}
 */
class BC2Data extends CompressedData {
	static type = "bc"

	static blockBytes = 16;
}

export default BC2Data;
