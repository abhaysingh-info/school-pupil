import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {School} from './entity/School';

export const AppDataSource = new DataSource({
	type: 'mariadb',
	host: 'localhost',
	port: 3306,
	username: 'abhay',
	password: 'abhay123',
	database: 'school',
	synchronize: true,
	logging: false,
	entities: [School],
	migrations: [],
	subscribers: [],
});
