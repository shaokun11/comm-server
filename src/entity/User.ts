import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	gl_auth_id: string;

	@Column()
	gl_auth_token: string;

	@Column()
	account: string;
	@Column()
	nickname: string;
	@Column()
	code: string;
	@Column()
	parent: string;
	@Column()
	address: string;
}
