import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {User} from "./user.entity";


@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly adminUserRepository: Repository<User>,
    ) {}

    // async findByEmail(email: string): Promise<User  | null> {
    //     return this.adminUserRepository.findOne({ where: { email } });
    // }
    //
    // async rawSQLExample(): Promise<any> {
    //     return this.authUserRepository.query('SELECT * FROM auth_users WHERE is_active = $1', [true]);
    // }
}