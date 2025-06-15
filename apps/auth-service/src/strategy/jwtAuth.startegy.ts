import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {RsaKeyService} from "../rsa-key/rsa-key.service";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly rsaKeyService: RsaKeyService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKeyProvider: (request: Request, rawJwtToken: any, done: (err: any, key: any) => void) => {
                const publicKey = this.rsaKeyService.getPublicKey();
                done(null, publicKey);
            },
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, role: payload.role };
    }
}