import Router from 'koa-router';
import home from './home';
import user from './user';

const router = new Router();
router.use("/public", home.routes()).use(home.allowedMethods());
router.use("/user", user.routes()).use(user.allowedMethods());
export default router;
