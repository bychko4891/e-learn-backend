import {IsEmail, IsString, Length} from "class-validator";

export class SignupDto {

    @IsEmail({},{message: 'Email address required'})
    @Length(6, 72, { message: 'Email must be between 8 and 72 characters' })
    readonly email: string;

    @IsString({ message: 'Password must be a string' })
    @Length(8, 72, { message: 'Password must be between 8 and 72 characters' })
    readonly password: string;

    @IsString({ message: 'Password must be a string' })
    @Length(3, 32, { message: 'Nick name must be between 3 and 32 characters' })
    readonly nickname: string;


    constructor(email: string, password: string, nickname: string) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        // Object.freeze(this);
    }

    toString() {
        return `LoginDto(email=${this.email}, password=${this.password}, nickname=${this.nickname})`;
    }
}