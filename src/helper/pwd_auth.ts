import dbUser from '../db/DBUser';
import {ApiResponse} from "../error";

const checkAccount = (user: string, password: string) => {
	let obj = dbUser.get(user);
	if (obj === undefined) {
		throw ApiResponse.account;
	}
	if (obj.pwd !== password) {
		throw ApiResponse.account;
	}
};

export default checkAccount;
