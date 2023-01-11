import { Column, Entity, EntitySchema, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user.model";

@Entity()
export class PostModel extends EntitySchema {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    content: string;
    @Column()
    date: Date;
    @ManyToOne(() => UserModel, (user) => user.posts)
    @Column()
    user: number;
}