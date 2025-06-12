import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BaseUser} from "../users/baseUser/BaseUser";
import {BaseUserModule} from "../users/baseUser/BaseUserModule";
import {AdminUser} from "../users/admin/AdminUser";
import {CommonModule} from "@app/common";
import {HttpModule} from "@nestjs/axios";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "../auth/jwt.strategy";

@Module({
    imports: [
        BaseUserModule,
        PassportModule,
        HttpModule, // Надає HttpService для ін'єкції
        CommonModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DB_HOST'),
                port: config.get<number>('DB_PORT'),
                username: config.get<string>('DB_USERNAME'),
                password: config.get<string>('DB_PASSWORD'),
                database: config.get<string>('DB_NAME'),
                entities: [BaseUser, AdminUser],
                migrations: ['dist/migrations/*.js'],
                cli: {
                    migrationsDir: 'src/migrations',
                },
                synchronize: true,
            }),

            inject: [ConfigService],
        }),
    ],
    providers: [
        JwtStrategy, // Реєструємо нашу локальну стратегію як провайдер
    ],
})
export class AppModule {}



