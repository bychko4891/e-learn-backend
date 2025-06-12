import {ChildEntity, Column} from "typeorm";
import {BaseUser} from "../baseUser/BaseUser";

@ChildEntity()
export class AdminUser extends BaseUser {
    @Column()
    adminLevel: number;
}