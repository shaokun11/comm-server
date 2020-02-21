interface userInfo {
	pwd: string
}

let dbUser = new Map<string, userInfo>();
dbUser.set("nick", {pwd: "7333343594a3aaa44be2fb7c92e4c1788d957d63"});
dbUser.set("alice", {pwd: "7333343594a3aaa44be2fb7c92e4c1788d957d63"});
export default dbUser;
