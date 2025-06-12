import {IsEmail, IsString, Length, Max, Min} from "class-validator";

export class LoginDto {

    @IsEmail({},{message: 'Email address required'})
    readonly email: string;

    @IsString({ message: 'Password must be a string' })
    @Length(8, 72, { message: 'Password must be between 8 and 72 characters' })
    readonly password: string;

    @IsString({ message: 'Password must be a string' })
    @Length(32, 32, { message: 'Device Fingerprinting must be between 32 characters' })
    readonly deviceFingerprinting: string;


    constructor(email: string, password: string, deviceFingerprinting: string) {
        this.email = email;
        this.password = password;
        this.deviceFingerprinting = deviceFingerprinting;
        // Object.freeze(this);
    }

    toString() {
        return `LoginDto(email=${this.email}, password=${this.password}, deviceFingerprinting=${this.deviceFingerprinting})`;
    }
}