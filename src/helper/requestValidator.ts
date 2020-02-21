import {validate} from "class-validator";
import {ApiResponse} from "../error";

export default async function exeValidate(obj: any) {
	let errArr = await validate(obj);
	if (errArr.length > 0) {
		let error = ApiResponse.params;
		error.message = Object.values(errArr[0].constraints)[0];
		throw error;
	}
}
