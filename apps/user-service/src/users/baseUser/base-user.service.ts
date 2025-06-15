import {Injectable} from "@nestjs/common";
import {BaseUserRepository} from "./base-user.repository";


@Injectable()
export class BaseUserService {

    constructor(
        private readonly repository: BaseUserRepository
    ) {}

    async someMethod(email: string) {
        const user = await this.repository.findByEmail(email);
        // ... якась логіка
        return user;
    }
}