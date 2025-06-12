import {Entity, Column, TableInheritance, PrimaryColumn} from 'typeorm';
import { Role } from '@app/common/enums/role.enum';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class BaseUser {

    @PrimaryColumn()
    id: number;

    @Column()
    uuid: string;

    @Column()
    firstname: string;

    @Column()
    surname: string;

    @Column()
    email: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;
}