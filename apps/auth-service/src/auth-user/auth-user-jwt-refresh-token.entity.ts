import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {JoinColumn, OneToOne} from "typeorm";
import {AuthUser} from "./auth-user.entity";

@Entity("auth_user_jwt_refresh_tokens")
export class AuthUserJwtRefreshToken {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    jwtRefreshToken: string;

    @Column({ nullable: true })
    deviceFingerprinting: string;

    @OneToOne(() => AuthUser, user => user.jwtRefreshToken)
    @JoinColumn()
    user: AuthUser;

    @Column({nullable: true, type: 'timestamp'})
    deletionTime: Date;
}