import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import {Role} from "@app/common/enums/role.enum";
import {ClientKafka} from "@nestjs/microservices";
import {KAFKA_SERVICE} from "../kafka/authKafka.module";
import {AuthUserRepository} from "./auth-user.repository";
import {SignupDto} from "./dto/signup.dto";
import {AuthUserJwtRefreshToken} from "./auth-user-jwt-refresh-token.entity";
import {AuthUser} from "./auth-user.entity";

@Injectable()
export class AuthUserService {

    private readonly saltRounds = 12;

    constructor(
        private readonly repository: AuthUserRepository,
        @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
    ) {}

    async sighup(signupDto: SignupDto) {
        const hashPassword = await this._hashPassword(signupDto.password);
        const serviceCodeUUID = uuidv4();
        const userUUID = uuidv4();
        const user = await this.repository.createUser(userUUID, signupDto.email, hashPassword, false, serviceCodeUUID, Role.USER);
        user.jwtRefreshToken = new AuthUserJwtRefreshToken();
        user.jwtRefreshToken.user = user;
        await this.repository.saveUser(user);
        // ВІДПРАВЛЯЄМО ПОДІЮ В KAFKA
        // 'user_created' - це назва топіка/події
        // payload - дані, які ми відправляємо
        // await this.onModuleInit();
        this.kafkaClient.emit('user_created', {
            userId: user.id,
            email: user.email,

        });
    }

    async validateUser(email: string, password: string): Promise<AuthUser> {
        const user = await this.repository.findOneByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            // const { password, ...result } = user;
            //TODO: додати перевірку active user!!!
            return user;
        }
        throw new UnauthorizedException("Не вірний логін або пароль");
    }

    async saveUser(user: AuthUser): Promise<AuthUser> {
        return await this.repository.saveUser(user);
    }

    private async _hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async onModuleInit() {
        await this.kafkaClient.connect();
    }
}