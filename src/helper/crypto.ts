import crypto from 'crypto';
import ecc from "eosjs-ecc";
import bcrypt from 'bcrypt';

class CryptoHelpers {
	static sha256(msg: string) {
		return crypto.createHash("SHA256").update(msg).digest("hex");
	}

	static aesEncrypt(priKey: string, pubKey: string, msg: string) {
		let encryptMsg = ecc.Aes.encrypt(priKey, pubKey, msg);
		encryptMsg.nonce = encryptMsg.nonce.toString();
		return encryptMsg;
	}

	static doBase64(data: string) {
		return Buffer.from(data).toString("base64");
	}

	static undoBase64(data: string) {
		return Buffer.from(data, "base64").toString("utf-8");
	}

	static aesDecrypt(priKey: string, msg: string) {
		let data = JSON.parse(msg);
		return Buffer.from(ecc.Aes.decrypt(priKey,
			data.pubKey,
			data.nonce,
			Buffer.from(data.message),
			data.checksum)).toString("utf-8");
	}

	static async geneKeyPair(): Promise<string[]> {
		const priKey = await ecc.randomKey();
		const pubKey = ecc.privateToPublic(priKey);
		return [priKey, pubKey];
	}

	static async hashPassword(password: string | number) {
		let pwd = String(password);
		return bcrypt.hash(pwd, 10);
	}

	static async vertifyPassword(password: any, hash: string) {
		return bcrypt.compare(password, hash);
	}
}

//const currKeyPair = {
//	priKey: "5JqZRucgef3HcK4uLf7PiRVSDg29Yzq71TZ2vdKF6pZq1xzH5Ya",
//	pubKey: "EOS85v84iF4ZpHvZm1VXBxmHDaJg8qrM7PBjntd784yF8vjx7ZnHn"
//};

//   client key
//   '5HuzFj1h2HF1Adnvei6xqB4nGC8zNmmjdy5Z55MyPYTQps68dkm',
//   'EOS7bM3gov4kzaSRNHeKzC5SAMKpMLRFT4s4MLdDxThhjS4DD2FgG'
// const toEncryptMsg = "hello world."
// const encryptMsg = CryptoHelpers.aesEncrypt("5HuzFj1h2HF1Adnvei6xqB4nGC8zNmmjdy5Z55MyPYTQps68dkm",
//   currKeyPair.pubKey,
//   toEncryptMsg)
// encryptMsg.pubKey = "EOS7bM3gov4kzaSRNHeKzC5SAMKpMLRFT4s4MLdDxThhjS4DD2FgG"
// let deMsg = CryptoHelpers.aesDecrypt(currKeyPair.priKey, JSON.stringify(encryptMsg))
// console.log(deMsg)

//CryptoHelpers.hashPassword("hello world").then(console.log);
//CryptoHelpers.vertifyPassword("hello world", '$2b$10$/X.pFhnFgJI8m31A.rwGGOSLLAKq6dfz9XinzveUKGW2kq2LbjctW').then(console.log);
CryptoHelpers.geneKeyPair().then(res => {
	console.log(res);
});
export default CryptoHelpers;
