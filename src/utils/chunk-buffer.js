/**
 * Simple function to chunk a buffer into an array of buffers.
 *
 * @param {Buffer} buffer - The buffer to be chunked.
 * @param {number} size - The chunk size.
 * @returns {Buffer[]}
 * The chunked Buffer.
 *
 * @example
 * chunkBuffer(Buffer.from([
 * 	1,
 * 	2,
 * 	3,
 * 	4,
 * 	5
 * ]), 3);
 *
 * // returns [Buffer<1,2,3>, Buffer<4,5>]
 */
export default (buffer, size) => Array.from(buffer)
	.reduce(
		(chunks, item, idx, arr) => (
			idx % size === 0 ?
				[...chunks, arr.slice(idx, idx + size)] :
				chunks
		),
		[]
	)
	.map((chunk) => Buffer.from(chunk));
