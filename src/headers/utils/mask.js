import {
	raise2
} from "../../utils/mappers.js";
import {
	add
} from "../../utils/reducers.js";

class Mask {
	numberValue = 0;

	defaultFlags = [];

	flags = {};

	constructor(defaultFlags) {
		this.defaultFlags = defaultFlags;
	}

	get value() {
		const {
			defaultFlags,
			flags
		} = this;

		return Object.entries({
			...Object.fromEntries(defaultFlags),
			...flags
		})
			.sort(
				(
					[key1],
					[key2]
				) => defaultFlags.indexOf(key1) - defaultFlags.indexOf(key2)
			)
			.map(([, value], index) => (value ? raise2(index) : 0))
			.reduce(add);
	}

	set value(number) {
		const {
			defaultFlags
		} = this;

		this.flags = Object.fromEntries(
			number.toString(2).split("")
				.reverse()
				.map((string, index) => [defaultFlags[index], Boolean(Number(string))])
		);
	}

	objectToFlags = () => {

	}
}

export default Mask;
