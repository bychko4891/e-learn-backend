import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import { Role } from '@app/common/enums/role.enum';
import {OneToOne} from "typeorm";
import {AuthUserJwtRefreshToken} from "./auth-user-jwt-refresh-token.entity";


@Entity("auth_users")
export class AuthUser {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'uuid'})
    uuid: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    active: boolean;

    @Column({ nullable: true })
    serviceCode: number;

    @Column()
    serviceCodeUUID: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @OneToOne(() => AuthUserJwtRefreshToken, jwtRefreshToken => jwtRefreshToken.user, {
        onDelete: "CASCADE",
        cascade: ["insert", "update", "remove"]
    })
    jwtRefreshToken: AuthUserJwtRefreshToken;

    @CreateDateColumn({ type: 'timestamp' }) // timestamp або 'timestamptz' для з таймзоною
    createdAt: Date;
}