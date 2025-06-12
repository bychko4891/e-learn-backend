import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { generateKeyPairSync } from 'crypto';
import {RsaKeyRepository} from "./RsaKeyRepository";

@Injectable()
export class RsaKeyService implements OnModuleInit {

    private readonly logger = new Logger(RsaKeyService.name);
    private publicKey: string;
    private privateKey: string;

    constructor(
        private readonly keyRepository: RsaKeyRepository,
    ) {}


    async onModuleInit() {
        this.logger.log('Initializing keys...');

        const keyFromDb = await this.keyRepository.findLastRsaKey();

        if (keyFromDb) {
            this.logger.log('RSA keys found in database.');
            this.publicKey = keyFromDb.publicKey;
            this.privateKey = keyFromDb.privateKey;
        } else {
            this.logger.log('No RSA keys found. Generating a new pair...');
            await this.generateAndSaveKeys();
        }
    }

    private async generateAndSaveKeys() {
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        });

        this.publicKey = publicKey;
        this.privateKey = privateKey;

        const dateOfRevoked = new Date();
        dateOfRevoked.setFullYear(dateOfRevoked.getFullYear() + 1)
        const newKey = await this.keyRepository.createNewRsaKey(publicKey, privateKey, false, dateOfRevoked);
        await this.keyRepository.saveRsaKey(newKey);
        this.logger.log('New RSA key pair has been generated and saved.');
    }

    // Публічні методи для отримання ключів іншими сервісами
    getPublicKey(): string {
        return this.publicKey;
    }

    getPrivateKey(): string {
        return this.privateKey;
    }
}