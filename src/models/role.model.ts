import { Entity, EntitySchema, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoleModel extends EntitySchema {
    @PrimaryGeneratedColumn()
    id: number;

}