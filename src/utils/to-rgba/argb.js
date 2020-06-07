import chunkBuffer from "../chunk-buffer.js";

export default (buffer) => Buffer.concat(
	chunkBuffer(buffer, 4).map((pixel) => Buffer.from([...pixel.slice(1), pixel[0]]))
);
