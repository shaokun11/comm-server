import {Context} from "koa";
import {ApiResponse} from "../error";

async function responseMiddleware(ctx: Context, next: Function) {
	try {
		await next();
		ctx.status = 200;
		ctx.body = {
			...ApiResponse.success,
			data: ctx.body || {}
		};

	} catch (err) {
		ctx.status = 200;
		let retMsg = {
			code: -1,
			message: "unknow error",
			data: {}
		};
		if (err.name === "apiError") {
			retMsg.code = err.code;
			retMsg.message = err.message;
		} else {
			retMsg.code = ApiResponse.system.code;
		}
		ctx.body = retMsg;
	}
}

export default responseMiddleware;
