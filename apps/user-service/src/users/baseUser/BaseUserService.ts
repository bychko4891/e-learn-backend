import {Injectable} from "@nestjs/common";
import {BaseUserRepository} from "./BaseUserRepository";


@Injectable()
export class BaseUserService {

    constructor(
        private readonly baseUserRepository: BaseUserRepository
    ) {}

    async someMethod(email: string) {
        const user = await this.baseUserRepository.findByEmail(email);
        // ... якась логіка
        return user;
    }
}