import { Module } from '@nestjs/common';
import {RsaKeyModule} from "../rsaKey/RsaKeyModule";
import {JwtModule} from "@nestjs/jwt";
import {RsaKeyService} from "../rsaKey/RsaKeyService";
import {ConfigService} from "@nestjs/config";
import {AuthController} from "./AuthController";
import {AuthService} from "./AuthService";
import {AuthUserModule} from "../authUser/AuthUserModule";

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
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}