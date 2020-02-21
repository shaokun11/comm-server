import  koaBody from 'koa-body';
import Koa from 'koa';
import logger from 'koa-logger';
//@ts-ignore
import cors from "@koa/cors";
import verifyJwt from "./middleware/verifyJwt";
import responseMiddleware from "./middleware/response";
import casbinMiddleware from "./middleware/casbin";
import router from "./page/index";
import TLogger from "./helper/logger";
import ConnMysql from "./db/ConnMysql";
import mysqlDbEntities from "./entity";

const port = process.env.PORT || 4001;
const app = new Koa();
app.use(cors("*"));
app.use(logger());
app.use(responseMiddleware);

app.use(koaBody({
	multipart: true,
	formidable: {
		multiples: true,
		keepExtensions: true,
	}
}));
app.use(verifyJwt({ignore: "public"}));
app.use(casbinMiddleware());
app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => {
	ConnMysql(mysqlDbEntities);
	TLogger.info("start", "server start on " + port);
});
