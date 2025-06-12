import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('rsa_keys')
export class RsaKey {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    publicKey: string;

    @Column({ type: 'text' })
    privateKey: string;

    @Column()
    revoked: boolean;

    @Column()
    dateOfRevoked: Date;

    @CreateDateColumn()
    createdAt: Date;

}