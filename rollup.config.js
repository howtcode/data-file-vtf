import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import progress from "rollup-plugin-progress";
import notify from "rollup-plugin-notify";
import visualizer from "rollup-plugin-visualizer";
import clear from "rollup-plugin-clear";
import filesize from "rollup-plugin-filesize";

export default {
	input: "./src/index.js",
	output: {
		file: "./dist/index.js",
		format: "es"
	},
	plugins: [
		clear({
			targets: ["./dist"]
		}),
		babel({
			babelHelpers: "bundled"
		}),
		commonjs(),
		json(),
		progress(),
		notify(),
		visualizer({
			filename: "./statistics/sun.html",
			template: "sunburst"
		}),
		visualizer({
			filename: "./statistics/tree.html",
			template: "treemap"
		}),
		filesize()
	]
};
