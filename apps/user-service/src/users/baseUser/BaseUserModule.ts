import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BaseUser} from "./BaseUser";
import {BaseUserRepository} from "./BaseUserRepository";
import {BaseUserService} from "./BaseUserService";
import {BaseUserController} from "./baseUser.controller";

@Module({
    imports: [TypeOrmModule.forFeature([BaseUser])],
    providers: [BaseUserService, BaseUserRepository],
    controllers: [BaseUserController],
    exports: [BaseUserModule],
})
export class BaseUserModule {}