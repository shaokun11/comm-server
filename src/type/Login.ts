import {IsDefined, MinLength} from "class-validator";

export default class Login {
	@MinLength(3)
	@IsDefined()
	user: string;

	@IsDefined()
	@MinLength(6)
	password: string;

	constructor(args: Login) {
		this.user = args.user;
		this.password = args.password;
	}
}
