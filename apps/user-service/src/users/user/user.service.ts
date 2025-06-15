import {Injectable} from "@nestjs/common";
import {UserRepository} from "./user.repository";


@Injectable()
export class UserService {

    constructor(
        private readonly repository: UserRepository
    ) {}

    // async someMethod(email: string) {
    //     const user = await this.repository.findByEmail(email);
    //     // ... якась логіка
    //     return user;
    // }
}