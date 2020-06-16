import {
	ABGRData,
	ARGBData,
	BGRAData,
	RGBAData
} from "../../data/uncompressed/4.js";
import {
	BGRData,
	RGBData
} from "../../data/uncompressed/3.js";
import {
	IAData
} from "../../data/uncompressed/2.js";
import {
	IData,
	AData
} from "../../data/uncompressed/1.js";
import {
	BC1Data, BC2Data, BC3Data
} from "../../data/compressed/bc.js";

const wtf = new Error("wtf is this format then??? (and no, rgb565 isn't a reasonable format btw)");

const {
	max
} = Math;

const getMipmap = (
	buffer,
	offset,
	format,
	width,
	height
) => {
	const dxtSz = (max(4, width) / 4) * (max(4, height) / 4);

	const baseProduct = width * height;

	const newDataLength = baseProduct * 4;

	let rawData = new Uint8Array(0);
	let data = new Uint8Array(0);

	// extracting bit info from format name
	switch (format.replace(/^(.*?)([0-9]+)(.*?)$/, "$2")) {
		case "8888": {
			const dataLength = newDataLength;

			rawData = Uint8Array.from(buffer.slice(offset, offset + dataLength));

			switch (format) {
				case "rgba8888": {
					data = new RGBAData(rawData);
					break;
				}
				case "abgr8888": {
					data = RGBAData.from(new ABGRData(rawData));
					break;
				}
				case "argb8888": {
					data = RGBAData.from(new ARGBData(rawData));
					break;
				}
				case "bgra8888": {
					data = RGBAData.from(new BGRAData(rawData));
					break;
				}
				default:
					throw wtf;
			}

			break;
		}
		case "888": {
			const dataLength = baseProduct * 3;

			rawData = Uint8Array.from(buffer.slice(offset, offset + dataLength));

			switch (format) {
				case "rgb888":
				case "rgb888_bluescreen": {
					data = RGBAData.from(new RGBData(rawData));

					break;
				}
				case "bgr888":
				case "bgr888_bluescreen": {
					data = RGBAData.from(new BGRData(rawData));

					break;
				}
				default:
					throw wtf;
			}

			break;
		}
		case "88":
		case "4444": {
			const dataLength = baseProduct * 2;

			rawData = Uint8Array.from(buffer.slice(offset, offset + dataLength));

			switch (format) {
				case "ia88": {
					data = RGBAData.from(new IAData(rawData));

					break;
				}
				default:
					throw wtf;
			}

			break;
		}
		case "8": {
			const dataLength = baseProduct;

			rawData = Uint8Array.from(buffer.slice(offset, offset + dataLength));

			switch (format) {
				case "i8": {
					data = RGBAData.from(new IData(rawData));

					break;
				}
				case "a8": {
					data = RGBAData.from(new AData(rawData));

					break;
				}
				default:
					throw wtf;
			}

			break;
		}
		case "1": {
			const dataLength = dxtSz * 8;

			rawData = Uint8Array.from(buffer.slice(offset, offset + dataLength));

			switch (format) {
				case "dxt1":
				case "dxt1_onebitalpha": {
					data = RGBAData.from(new BC1Data(rawData));
					break;
				}
				default:
					throw wtf;
			}

			break;
		}
		case "3": {
			const dataLength = dxtSz * 16;

			rawData = Uint8Array.from(buffer.slice(offset, offset + dataLength));

			switch (format) {
				case "dxt3": {
					data = RGBAData.from(new BC2Data(rawData));

					break;
				}
				default:
					throw wtf;
			}

			break;
		}
		case "5": {
			const dataLength = dxtSz * 16;

			rawData = Uint8Array.from(buffer.slice(offset, offset + dataLength));

			switch (format) {
				case "dxt5": {
					data = RGBAData.from(new BC3Data(rawData));

					break;
				}
				default:
					throw wtf;
			}

			break;
		}
		default:
			throw wtf;
	}

	const mipmap = {
		data,
		height,
		offset,
		rawData,
		width
	};

	return mipmap;
};

export default getMipmap;
