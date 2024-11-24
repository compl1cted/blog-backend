import {MigrationInterface, QueryRunner, Table} from "typeorm";
const post = new Table({
    name: "post",
    columns: [
        {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
        },
        {
            name: "title",
            type: "varchar",
        },
        {
            name: "content",
            type: "text",
        },
        {
            name: "userId",
            type: "int",
            isNullable: false,
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
    ],
});

export class Post1732463298098 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(post);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(post);
    }

}
