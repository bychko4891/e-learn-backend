import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RsaKey} from "./rsa-key.entity";
import {RsaKeyService} from "./rsa-key.service";
import {RsaKeyRepository} from "./rsa-key.repository";
import {WellKnownController} from "./well-known.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature([RsaKey])
    ],
    providers: [
        RsaKeyService,
        RsaKeyRepository
    ],
    controllers: [WellKnownController],
    exports: [RsaKeyService],
})
export class RsaKeyModule {}