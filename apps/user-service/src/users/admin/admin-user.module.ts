import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AdminUser} from "./admin-user.entity";
import {AdminUserService} from "./admin-user.service";
import {AdminUserRepository} from "./admin-user.repository";
import {AdminUserController} from "./admin-user.controller";


@Module({
    imports: [TypeOrmModule.forFeature([AdminUser])],
    providers: [AdminUserService,AdminUserRepository],
    controllers: [AdminUserController],
    exports: [AdminUserModule],
})
export class AdminUserModule {}