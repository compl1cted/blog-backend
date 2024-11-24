import {MigrationInterface, QueryRunner, Table} from "typeorm";

const user = new Table({
    name: "user",
    columns: [
        {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
        },
        {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
        },
        {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
        },
        {
            name: "username",
            type: "varchar",
            isNullable: false,
        },
        {
            name: "email",
            type: "varchar",
            isNullable: false,
        },
        {
            name: "password",
            type: "varchar",
            isNullable: false,
        },
        {
            name: "activationLink",
            type: "varchar",
            isNullable: false,
        },
        {
            name: "isActivated",
            type: "boolean",
            default: false,
        },
        {
            name: "refreshToken",
            type: "varchar",
            length: '255',
            isNullable: true,
        },
    ],
});

export class User1732453788200 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(user);
    }

}
