import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm";
import { join } from 'path';
import {PassportModule} from "@nestjs/passport";
import {JwtAuthStrategy} from "../strategy/jwtAuth.startegy";
import {AuthModule} from "../auth/auth.module";
import {AuthUser} from "../auth-user/auth-user.entity";
import {AuthUserJwtRefreshToken} from "../auth-user/auth-user-jwt-refresh-token.entity";
import {AuthUserModule} from "../auth-user/auth-user.module";
import {RsaKeyModule} from "../rsa-key/rsa-key.module";
import {RsaKey} from "../rsa-key/rsa-key.entity";



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