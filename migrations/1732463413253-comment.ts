import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

const comment = new Table({
    name: "comment",
    columns: [
        {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
        },
        {
            name: "text",
            type: "text",
        },
        {
            name: "userId",
            type: "int",
            isNullable: false,
        },
        {
            name: "postId",
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

const userForeignKey = new TableForeignKey({
    columnNames: ["userId"],
    referencedColumnNames: ["id"],
    referencedTableName: "user",
    onDelete: "CASCADE", // Deletes comments when the user is deleted
});

const postForeignKey = new TableForeignKey({
    columnNames: ["postId"],
    referencedColumnNames: ["id"],
    referencedTableName: "post",
    onDelete: "CASCADE", // Deletes comments when the post is deleted
});

export class Comment1732463413253 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(comment);
        await queryRunner.createForeignKey('comment', userForeignKey);
        await queryRunner.createForeignKey('comment', postForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const userForeignKey = comment.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("userId") !== -1
        );
        if (userForeignKey) {
            await queryRunner.dropForeignKey("comment", userForeignKey);
        }

        const postForeignKey = comment.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("postId") !== -1
        );
        if (postForeignKey) {
            await queryRunner.dropForeignKey("comment", postForeignKey);
        }

        await queryRunner.dropTable("comment");
    }

}
