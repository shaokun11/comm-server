import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	age: string;

	@Column()
	salary: string;
}
