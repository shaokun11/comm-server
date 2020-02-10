import Router from 'koa-router';
import home from './home';
import user from './user';
import file from './file';

const router = new Router();
router.use("/public", home.routes()).use(home.allowedMethods());
router.use("/user", user.routes()).use(user.allowedMethods());
router.use("/file", file.routes()).use(file.allowedMethods());
export default router;
