import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import {
	terser
} from "rollup-plugin-terser";

export default {
	input: "./src/index.js",
	output: {
		file: "./dist/node/index.js",
		format: "cjs"
	},
	plugins: [
		babel({
			babelHelpers: "bundled"
		}),
		commonjs(),
		json()
	]
};
