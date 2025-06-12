import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RsaKeyService} from "./RsaKeyService";
import {RsaKeyRepository} from "./RsaKeyRepository";
import {RsaKey} from "./RsaKey.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([RsaKey])
    ],
    providers: [
        RsaKeyService,
        RsaKeyRepository
    ],
    exports: [RsaKeyService],
})
export class RsaKeyModule {}