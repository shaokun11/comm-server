import Router from 'koa-router';
import {Context} from 'koa';
import pwdAuth from '../helper/pwd_auth';
import jwtAuth from '../helper/jwt_auth';
import requestValidator from "../helper/requestValidator";
import Login from "../type/Login";

const home = new Router();
const login = async (ctx: Context) => {
	await requestValidator(new Login(ctx.request.body));
	const {user, password} = ctx.request.body;
	pwdAuth(user, password);
	let loginToken = await jwtAuth.makeJwt({account: user});
	ctx.body = {
		token: loginToken
	};
};

home.post("/login", login);
export default home;
