import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitUser1717600000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: false,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}