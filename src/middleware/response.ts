import {Context} from "koa";
import {ApiError, ResponseCode} from "./responseCode";

async function responseMiddleware(ctx: Context, next: Function) {
	try {
		await next();
		ctx.status = 200;
		ctx.body = {
			code: ResponseCode.Success,
			message: "success",
			data: ctx.body || {}
		};

	} catch (err) {
		ctx.status = 200;
		let retMsg = {
			code: -1,
			message: "Server Error",
			data: {}
		};
		if (err.message.includes("You have an error in your SQL syntax")) {
			retMsg.code = ResponseCode.SystemDbError;
		} else if (401 === err.status) {
			retMsg.code = ResponseCode.TokenInvalidError;
			retMsg.message = err.message;
		} else if (err instanceof ApiError) {
			retMsg.code = err.code;
			retMsg.message = err.message;
		} else {
			retMsg.code = ResponseCode.SystemError;
		}
		ctx.body = retMsg;
	}
}

export default responseMiddleware;
