import { BaseEntity, Column, Entity, EntitySchema, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostModel } from "./post.model";

@Entity()
export class UserModel extends EntitySchema {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    useranme: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @OneToMany(() => PostModel, (post) => post.user)
    @JoinTable()
    posts: PostModel[];
}