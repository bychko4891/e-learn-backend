import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {RsaKey} from "./rsa-key.entity";

@Injectable()
export class RsaKeyRepository {

    constructor(
        @InjectRepository(RsaKey )
        private readonly rsaKeyRepository: Repository<RsaKey >,
    ) {}

    async findLastRsaKey(): Promise<RsaKey  | null> {
        return await this.rsaKeyRepository.findOne({
            where: { revoked: false },
            order: { createdAt: 'DESC' },
        });
    }

    async createNewRsaKey(publicKey: string, privateKey: string, revoked: boolean, dateOfRevoked: Date): Promise<RsaKey> {
        return this.rsaKeyRepository.create({publicKey, privateKey, revoked, dateOfRevoked});
    }

    async saveRsaKey(rsaKey: RsaKey): Promise<RsaKey> {
        return await this.rsaKeyRepository.save(rsaKey);
    }

}