import {ChildEntity} from "typeorm";
import {BaseUser} from "../baseUser/base-user.entity";

@ChildEntity()
export class AdminUser extends BaseUser {

}