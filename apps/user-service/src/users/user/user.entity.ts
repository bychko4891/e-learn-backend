import {ChildEntity, Column, CreateDateColumn} from "typeorm";
import {BaseUser} from "../baseUser/base-user.entity";
import {UserGender} from "./user-gender.enum";


@ChildEntity()
export class User extends BaseUser {

    @Column()
    login: string;

    @Column({length: 300})
    about: string;

    @Column()
    vip: boolean;

    @Column({name: "vip_expiration_date", type: 'date' })
    vipExpirationDate: Date;

    @Column({
        type: 'enum',
        enum: UserGender,
        default: UserGender.FEMALE,
    })
    gender: UserGender;

    @Column({name: "user_ip"})
    userIp: string;

    @Column({nullable: true, name: "last_visit"})
    lastVisit: Date;

    @Column({ name: "create_at",type: 'timestamp' })
    createdAt: Date;

}