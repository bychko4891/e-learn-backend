import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Role} from "@app/common/enums/role.enum";
import {AuthUser} from "./auth-user.entity";

@Injectable()
export class AuthUserRepository {
    constructor(
        @InjectRepository(AuthUser )
        private readonly authUserRepository: Repository<AuthUser >,
    ) {}

    async createUser(uuid: string,email: string, password: string, active: boolean, serviceCodeUUID: string, role: Role) {
        return this.authUserRepository.create({uuid, email, password, active, serviceCodeUUID, role})
    }

    async findOneByEmail(email: string): Promise<AuthUser  | null> {
        return this.authUserRepository.findOne({ where: { email }, relations: ['jwtRefreshToken'] });
    }

    async saveUser(user: AuthUser): Promise<AuthUser> {
        return this.authUserRepository.save(user);
    }
    // async rawSQLExample(): Promise<any> {
    //     return this.authUserRepository.query('SELECT * FROM auth_users WHERE is_active = $1', [true]);
    // }
}