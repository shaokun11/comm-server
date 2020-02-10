import log4js from 'log4js';

log4js.configure({
	pm2: true,
	appenders: {
		out: {type: "console"}
	},
	"categories": {
		//    ALL: Level;
		//   OFF: Level;
		default: {appenders: ["out"], "level": "ALL"}
	}
});
let tLogger = log4js.getLogger("default");

class TLogger {
	static info(type: string, ...msg: string[]) {
		tLogger.info("-time:", new Date(), "-timestamp", Date.now(), "-type:", type, "-data:", ...msg);
	}

	static error(type: string, ...msg: string[]) {
		tLogger.error("-time:", new Date(), "-timestamp", Date.now(), "-type:", type, "-data:", ...msg);
	}

	static makeLoggerKey() {
		return Date.now().toString() + Math.random().toString().slice(2);
	}
}

export default TLogger;
