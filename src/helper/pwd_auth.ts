import dbUser from '../db/DBUser';
import {PwdError, UserNotFoundError} from "../middleware/responseCode";

const checkAccount = (user: string, password: string) => {
	const users = [...dbUser.keys()];
	if (!users.some(e => e === user)) {
		throw new UserNotFoundError();
	}
	if (dbUser.get(user).pwd !== password) {
		throw new PwdError();
	}
};

export default checkAccount;
