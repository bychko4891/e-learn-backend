import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {BaseUser} from "./BaseUser";
import {Injectable} from "@nestjs/common";


@Injectable()
export class BaseUserRepository {
    constructor(
        @InjectRepository(BaseUser )
        private readonly authUserRepository: Repository<BaseUser >,
    ) {}

    async findByEmail(email: string): Promise<BaseUser  | null> {
        return this.authUserRepository.findOne({ where: { email } });
    }
    //
    // async rawSQLExample(): Promise<any> {
    //     return this.authUserRepository.query('SELECT * FROM auth_users WHERE is_active = $1', [true]);
    // }
}