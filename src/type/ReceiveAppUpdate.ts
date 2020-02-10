import {IsIn, IsNotEmpty} from "class-validator";


export default class ReceiveAppUpdate {
	@IsNotEmpty()
	version: string;

	@IsNotEmpty()
	name: string;

	@IsIn(["ios", "android", "zip"])
	type: string;

	@IsNotEmpty()
	info: string;

	constructor(args: ReceiveAppUpdate) {
		this.info = args.info;
		this.version = args.version;
		this.name = args.name;
		this.type = args.type;
	}
}
