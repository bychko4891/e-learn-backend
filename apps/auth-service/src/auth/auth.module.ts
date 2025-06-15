import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {JwtAuthStrategy} from "../strategy/jwtAuth.startegy";
import {RsaKeyModule} from "../rsa-key/rsa-key.module";
import {AuthUserModule} from "../auth-user/auth-user.module";
import {RsaKeyService} from "../rsa-key/rsa-key.service";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";

@Module({
    imports: [
        RsaKeyModule,
        AuthUserModule,
        JwtModule.registerAsync({
            imports: [RsaKeyModule],
            inject: [RsaKeyService, ConfigService],
            useFactory: async (keyService: RsaKeyService, configService: ConfigService) => {
                await keyService.onModuleInit();
                return {
                    privateKey: keyService.getPrivateKey(),
                    publicKey: keyService.getPublicKey(),
                    signOptions: {
                        algorithm: 'RS256',
                        expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION', '15m'),
                    },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthStrategy,],
    exports: [AuthService],
})
export class AuthModule {}