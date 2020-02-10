import Router from 'koa-router';
import {getRepository} from "typeorm";
import User from "../entity/User";

const user = new Router();
user.post("/", async ctx => {
	const user = ctx.state.user;
	console.log(user);
	ctx.body = await getRepository(User)
		.createQueryBuilder("user")
		.where('user.name = :name', {name: user.account})
		.getOne();
});
export default user;
