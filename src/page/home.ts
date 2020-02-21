import Router from 'koa-router';
import pwdAuth from '../helper/pwd_auth';
import jwtAuth from '../helper/jwt_auth';
import requestValidator from "../helper/requestValidator";
import Login from "../type/Login";

const home = new Router();

home.post("/login", async ctx => {
	await requestValidator(new Login(ctx.request.body));
	const {user, password} = ctx.request.body;
	pwdAuth(user, password);
	let loginToken = await jwtAuth.makeJwt({account: user});
	ctx.body = {
		token: loginToken
	};
});
export default home;
