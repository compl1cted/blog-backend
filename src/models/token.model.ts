import { Column, Entity, EntitySchema, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user.model";

@Entity()
export class TokenModel extends EntitySchema {
    @PrimaryGeneratedColumn()
    id: number;
    @OneToOne(() => UserModel)
    @Column()
    user: UserModel;
}