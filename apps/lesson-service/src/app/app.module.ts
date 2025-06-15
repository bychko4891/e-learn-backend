import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {AuthUserModule} from "../authUser/AuthUserModule";
import {TypeOrmModule} from "@nestjs/typeorm";
import { join } from 'path';
import {PassportModule} from "@nestjs/passport";
import {RsaKeyModule} from "../rsaKey/RsaKeyModule";
import {AuthModule} from "../auth/AuthModule";
import {RsaKey} from "../rsaKey/RsaKey.entity";
import {AuthUser} from "../authUser/AuthUser.entity";
import {AuthUserJwtRefreshToken} from "../authUser/AuthUserJwtRefreshToken.entity";
import {JwtAuthStrategy} from "../strategy/jwtAuth.startegy";


@Module({
    imports: [
        AuthModule,
        RsaKeyModule,
        AuthUserModule,
        PassportModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DB_HOST'),
                port: config.get<number>('DB_PORT'),
                username: config.get<string>('DB_USERNAME_AUTH'),
                password: config.get<string>('DB_PASSWORD_AUTH'),
                database: config.get<string>('DB_NAME_AUTH'),
                entities: [RsaKey, AuthUser, AuthUserJwtRefreshToken],
                // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
                migrations: ['dist/migrations/*.js'],
                cli: {
                    migrationsDir: 'src/migrations',
                },
                synchronize: true,
                // synchronize: false,
            }),
            inject: [ConfigService],
        }),
    ],

})
export class AppModule {}