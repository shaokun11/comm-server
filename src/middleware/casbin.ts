import * as casbin from 'casbin';
import path from 'path';
import {Context} from 'koa';
import {ApiResponse} from "../error";

let enforcer: casbin.Enforcer;
const modelPath = path.resolve("src/middleware/permission/model.conf");
const policyPath = path.resolve("src/middleware/permission/policy.csv");
void function initEnforce() {
	casbin.newEnforcer(modelPath, policyPath).then(r => {
		enforcer = r;
	});
}();

const verify = () => async (ctx: Context, next: Function) => {
	if (enforcer.getAllObjects().includes(ctx.request.url)) {
		if (!await enforcer.enforce(ctx.state.user.account, ctx.request.url)) {
			ctx.status = 401;
			throw ApiResponse.permission;
		}
	}
	await next();
};

export default verify;
