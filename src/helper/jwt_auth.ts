import jwt from 'jsonwebtoken';
import {JWT_AUTH_PASSWORD} from "../const";
import {Context} from 'koa';
import {TokenExpireError} from "../middleware/responseCode";

const cacheToken: { [index: string]: string; } = {};

function verify(token: string) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, JWT_AUTH_PASSWORD, function (err, decoded) {
			if (err) reject(err);
			resolve(decoded);
		});
	});
}

class jwtAuth {
	static verifyJwt(option: { ignore: string }) {
		return async function f(ctx: Context, next: Function) {
			const requestUrl = ctx.request.url;
			if (option.ignore) {
				let test = new RegExp(option.ignore);
				if (test.test(requestUrl)) {
					await next();
					return;
				}
			}
			const token = ctx.request.headers["authorization"].split(" ")[1];
			const saveToken = cacheToken[ctx.state.user.account];
			if (saveToken && saveToken !== token) {
				throw new TokenExpireError();
			}
			await next();
		};
	}

	static async makeJwt({account}: { account: string }) {
		let login_token = jwt.sign(
			{account},
			JWT_AUTH_PASSWORD, {expiresIn: "3d"}
		);
		cacheToken[account] = login_token;
		return login_token;
	}
}

export default jwtAuth;
