import Router from 'koa-router';
import requestValidator from "../helper/requestValidator";
import ReceiveAppUpdate from "../type/ReceiveAppUpdate";
import fs from 'fs';
import path from 'path';
import {File} from "formidable";
import {ApiResponse} from "../error";

const file = new Router();
const saveFile = (filePath: string, name: string) => {
	const reader = fs.createReadStream(filePath);
	const writer = fs.createWriteStream(path.join(process.cwd(), "src/uploads/") + name);
	reader.pipe(writer);
};

file.post("/", async ctx => {
	const body = ctx.request.body;
	await requestValidator(new ReceiveAppUpdate(body));
	const files = ctx.request.files;
	if (!files) {
		throw ApiResponse.params;
	}
	let file = files.file;
	if (Array.isArray(file)) {
		for (let f  of file) {
			let file = f as File;
			saveFile(file.path, file.name);
		}
	} else {
		saveFile(file.path, file.name);
	}
});
export default file;
