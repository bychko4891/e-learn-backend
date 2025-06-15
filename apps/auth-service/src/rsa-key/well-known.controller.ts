import { Controller, Get } from '@nestjs/common';
import * as jose from 'jose';
import {RsaKeyService} from "./rsa-key.service";

@Controller('api/v1/jwks/.well-known')
export class WellKnownController {
    constructor(private readonly rsaKeyService: RsaKeyService) {}

    @Get('jwks.json')
    async getJwks() {

        const currentKey = await this.rsaKeyService.getActiveKey();
        const publicKeyObject = await jose.importSPKI(currentKey.publicKey, 'RS256');
        const jwk = await jose.exportJWK(publicKeyObject);

        return {
            keys: [
                {
                    ...jwk,
                    kid: currentKey.id.toString(),
                    use: 'sig',
                    alg: 'RS256',
                },
            ],
        };
    }
}