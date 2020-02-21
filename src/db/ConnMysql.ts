import {createConnection} from "typeorm";

export default function ConnMysql(entities: any[]) {
	 createConnection({
		type: "mysql",
		host: "localhost",
		port: 3306,
		username: "root",
		password: '12345678',
		database: "fast",
		// 一定设置为false ,由其他可视化工具创建即可,这里只需要其结构 ,如增删数据结构,也许同步更改实体类的结构
		synchronize: false,
		entities: entities,
	});
}
