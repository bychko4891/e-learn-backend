import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { BaseUser } from './src/users/baseUser/BaseUser';
import { AdminUser } from './src/users/admin/AdminUser';

// Вибір env-файлу через змінну середовища
const envFile = process.env.ENV_PATH || '.env';
dotenv.config({ path: envFile });

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [BaseUser, AdminUser],
    migrations: ['dist/apps/user-service/migrations/*.js'],
    synchronize: false,
});