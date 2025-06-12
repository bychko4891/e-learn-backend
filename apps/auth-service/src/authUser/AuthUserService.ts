import {Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthUserRepository } from './AuthUserRepository';
import * as bcrypt from 'bcryptjs';
import {AuthUser} from "./AuthUser.entity";
import {SignupDto} from "./dto/SignupDto";
import { v4 as uuidv4 } from 'uuid';
import {Role} from "@app/common/enums/role.enum";
import {AuthUserJwtRefreshToken} from "./AuthUserJwtRefreshToken.entity";

@Injectable()
export class AuthUserService {

    private readonly saltRounds = 12;

    constructor(
        private readonly authUserRepository: AuthUserRepository
    ) {}

    async sighup(signupDto: SignupDto) {
        const hashPassword = await this._hashPassword(signupDto.password);
        const serviceCodeUUID = uuidv4();
        const userUUID = uuidv4();
        const user = await this.authUserRepository.createUser(userUUID, signupDto.email, hashPassword, false, serviceCodeUUID, Role.USER);
        user.jwtRefreshToken = new AuthUserJwtRefreshToken();
        user.jwtRefreshToken.user = user;
        await this.authUserRepository.saveUser(user);
    }

    async validateUser(email: string, password: string): Promise<AuthUser> {
        const user = await this.authUserRepository.findOneByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            // const { password, ...result } = user;
            //TODO: додати перевірку active user!!!
            return user;
        }
        throw new UnauthorizedException("Не вірний логін або пароль");
    }

    async saveUser(user: AuthUser): Promise<AuthUser> {
        return await this.authUserRepository.saveUser(user);
    }

    private async _hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }
}