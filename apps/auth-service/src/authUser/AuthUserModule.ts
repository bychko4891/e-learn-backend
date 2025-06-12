import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from './AuthUser.entity';
import { AuthUserController } from './AuthUserController';
import { AuthUserService } from './AuthUserService';
import { AuthUserRepository } from './AuthUserRepository';
import {CommonModule} from "@app/common";
import {AuthUserJwtRefreshToken} from "./AuthUserJwtRefreshToken.entity";

@Module({
    imports: [
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