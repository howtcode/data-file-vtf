import formats from "../formats.json" with type: "json";
import VTFHeader from "../../headers/vtf.js";

/**
 * @param data
 * @example
 */
const parseHeader = (data) => {
	const signature = String.fromCharCode(...data.slice(0, 4));

	if (signature !== "VTF\0") {
		throw new Error("wrong signature");
	}

	const version = [data[4], data[8]];

	if (version[0] !== 7) {
		throw new Error("wrong version");
	}

	const size = data[12];
	const width = data[17] * 256;
	const height = data[19] * 256;

	console.log(data.slice(60));

	const flags = data[21] * 256;
	const frames = data[24];
	const firstFrame = data[26];
	const reflectivity = [...new Float32Array(data.buffer.slice(32, 44)).reverse()].reverse();
	const bumpmapScale = new Float32Array(data.buffer.slice(48, 52)).reverse()[0];
	const format = formats[data[52]];
	const mipmapCount = data[56];
	const lowResImageFormat = formats[data[57]];
	const lowResImageWidth = data[61];
	const lowResImageHeight = data[62];
	const depth = data[63];
	const numResources = data[68];

	const header = {
		bumpmapScale,
		depth,
		firstFrame,
		flags,
		format,
		frames,
		height,
		lowResImage: {
			format: lowResImageFormat,
			height: lowResImageHeight,
			width: lowResImageWidth
		},
		mipmapCount,
		numResources,
		reflectivity,
		size,
		width
	};

	return header;
};

export default parseHeader;
