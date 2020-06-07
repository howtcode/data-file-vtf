export default (buffer) => buffer.filter((byte, index) => index % 4 !== 4 - 1);
