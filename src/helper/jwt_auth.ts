import jwt from 'jsonwebtoken';
import {JWT_AUTH_PASSWORD} from "../const";
import {Context} from 'koa';
import {ApiResponse} from "../error";

const cacheToken: { [index: string]: string; } = {};

interface jwtPayload {
	account: string
}

function verify(token: string) {
	return new Promise<{ account: string }>((resolve, reject) => {
		jwt.verify(token, JWT_AUTH_PASSWORD, function (err, decoded) {
			if (err) reject(err);
			resolve(decoded as jwtPayload);
		});
	});
}

class jwtAuth {
	static verifyJwt(option: { ignore: string }) {
		return async function f(ctx: Context, next: Function) {
			const requestUrl = ctx.request.url.substr(1);
			if (option.ignore) {
				let res = requestUrl.startsWith(option.ignore);
				if (res) {
					return await next();
				}
			}
			const authToken = ctx.request.headers["authorization"];
			if (authToken === undefined) {
				throw ApiResponse.token;
			}
			const token = authToken.split(" ")[1];
			let account = "";
			try {
				let user = await verify(token);
				account = user.account;
			} catch (e) {
				throw ApiResponse.token;
			}
			ctx.state.user = account;
			const saveToken = cacheToken[account];
			if (saveToken && saveToken !== token) {
				throw ApiResponse.tokenExpire;
			}
			await next();
		};
	}

	static async makeJwt({account}: jwtPayload) {
		let login_token = jwt.sign(
			{account},
			JWT_AUTH_PASSWORD,
			{
				expiresIn: "1d",
				subject: "cyber",
				issuer: "cyber",
				algorithm: 'HS256'
			}
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
