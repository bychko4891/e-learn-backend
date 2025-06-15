import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BaseUser} from "./base-user.entity";
import {BaseUserService} from "./base-user.service";
import {BaseUserRepository} from "./base-user.repository";
import {BaseUserController} from "./base-user.controller";


@Module({
    imports: [TypeOrmModule.forFeature([BaseUser])],
    providers: [BaseUserService, BaseUserRepository],
    controllers: [BaseUserController],
    exports: [BaseUserModule],
})
export class BaseUserModule {}