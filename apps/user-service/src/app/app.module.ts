import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommonModule} from "@app/common";
// import {HttpModule} from "@nestjs/axios";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "@app/common/strategy/jwt.strategy";
import {BaseUserModule} from "../users/baseUser/base-user.module";
import {BaseUser} from "../users/baseUser/base-user.entity";
import {AdminUser} from "../users/admin/admin-user.entity";

@Module({
    imports: [
        BaseUserModule,
        PassportModule,
        // HttpModule, // Надає HttpService для ін'єкції
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
                username: config.get<string>('DB_USERNAME_USER'),
                password: config.get<string>('DB_PASSWORD_USER'),
                database: config.get<string>('DB_NAME_USER'),
                entities: [BaseUser, AdminUser],
                migrations: ['dist/migrations/*.js'],
                cli: {
                    migrationsDir: 'src/migrations',
                },
                // synchronize: false,
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



