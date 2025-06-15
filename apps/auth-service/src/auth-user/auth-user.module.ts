import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CommonModule} from "@app/common";
import {AuthKafkaModule} from "../kafka/authKafka.module";
import {AuthUser} from "./auth-user.entity";
import {AuthUserJwtRefreshToken} from "./auth-user-jwt-refresh-token.entity";
import {AuthUserController} from "./auth-user.controller";
import {AuthUserService} from "./auth-user.service";
import {AuthUserRepository} from "./auth-user.repository";

@Module({
    imports: [
        AuthKafkaModule,
        CommonModule,
        TypeOrmModule.forFeature([AuthUser, AuthUserJwtRefreshToken])
    ],
    controllers: [AuthUserController],
    providers: [
        AuthUserService,
        AuthUserRepository
    ],
    exports: [AuthUserService],
})
export class AuthUserModule {}