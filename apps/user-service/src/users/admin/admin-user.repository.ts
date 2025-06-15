import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {AdminUser} from "./admin-user.entity";


@Injectable()
export class AdminUserRepository {
    constructor(
        @InjectRepository(AdminUser )
        private readonly adminUserRepository: Repository<AdminUser>,
    ) {}

    async findByEmail(email: string): Promise<AdminUser | null> {
        return this.adminUserRepository.findOne({ where: { email } });
    }
    //
    // async rawSQLExample(): Promise<any> {
    //     return this.authUserRepository.query('SELECT * FROM auth_users WHERE is_active = $1', [true]);
    // }
}