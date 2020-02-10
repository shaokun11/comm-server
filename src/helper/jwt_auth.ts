import jwt from 'jsonwebtoken';
import {JWT_AUTH_PASSWORD} from "../const";
import {Context} from 'koa';
import {TokenExpireError} from "../middleware/responseCode";

const cacheToken: { [index: string]: string; } = {};

function verify(token: string) {
	return new Promise<{ account: string }>((resolve, reject) => {
		jwt.verify(token, JWT_AUTH_PASSWORD, function (err, decoded) {
			if (err) reject(err);
			resolve(decoded as { account: string });
		});
	});
}

class jwtAuth {
	static verifyJwt(option: { ignore: string }) {
		return async function f(ctx: Context, next: Function) {
			const requestUrl = ctx.request.url;
			if (option.ignore) {
				if (requestUrl.startsWith(option.ignore)) {
					await next();
					return;
				}
			}
			const token = ctx.request.headers["authorization"].split(" ")[1];
			let account = "";

			try {
				let user = await verify(token);
				account = user.account;
			} catch (e) {
				throw new TokenExpireError(e.message);
			}
			ctx.extra = {user: account};
			const saveToken = cacheToken[account];
			if (saveToken && saveToken !== token) {
				throw new TokenExpireError();
			}
			await next();
		};
	}

	static async makeJwt({account}: { account: string }) {
		let login_token = jwt.sign(
			{account},
			JWT_AUTH_PASSWORD, {expiresIn: 1}
		);
		cacheToken[account] = login_token;
		return login_token;
	}
}

//jwtAuth.makeJwt({account: "shaokun"}).then(res => {
//	console.log(res);
//});
//// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50Ijoic2hhb2t1biIsImlhdCI6MTU4MTM0NzE5MiwiZXhwIjoxNTgxMzQ3MTkzfQ.5cDzOgvjLE8kbXaqT9Jb90zNoDt6-23AW6uk-KCjJFQ
//verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50Ijoic2hhb2t1biIsImlhdCI6MTU4MTM0NzE5MiwiZXhwIjoxNTgxMzQ3MTkzfQ.5cDzOgvjLE8kbXaqT9Jb90zNoDt6-23AW6uk-KCjJFQ").then(res => {
//	console.log(res);
//}).catch(console.error);


export default jwtAuth;
