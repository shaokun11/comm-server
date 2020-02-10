import {validate} from "class-validator";
import {ParamsError} from "../middleware/responseCode";

export default async function exeValidate(obj: any) {
	let errArr = await validate(obj);
	if (errArr.length > 0) {
		let errMsgArr = JSON.stringify(errArr[0].constraints);
		let msg = errMsgArr.split(",")[0].split(":")[1];
		throw new ParamsError(msg);
	}
}
