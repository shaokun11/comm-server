import {validate} from "class-validator";
import {ParamsError} from "../middleware/responseCode";

export default async function exeValidate(obj: any) {
	let errArr = await validate(obj);
	if (errArr.length > 0) {
		throw new ParamsError(Object.values(errArr[0].constraints)[0]);
	}
}
