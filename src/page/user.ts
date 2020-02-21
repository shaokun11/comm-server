import Router from 'koa-router';
import {getRepository} from "typeorm";
import User from "../entity/User";

const user = new Router();
user.post("/", async ctx => {
	const account = ctx.state.user;
	ctx.body = await getRepository(User)
		.createQueryBuilder("user")
		.where('user.account = :account', {account})
		.getOne();
});
export default user;
