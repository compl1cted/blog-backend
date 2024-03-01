import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntityTypeORM } from "../config/entity.typeorm";
import { PostEntity } from "../post/post.entity";
import { UserEntity } from "../user/user.entity";

@Entity()
export class CommentEntity extends BaseEntityTypeORM {
    @Column()
    text: string;

    @ManyToOne(() => UserEntity, (user) => user.comments)
    @JoinColumn()
    user: UserEntity;

    @Column()
    userId: number;

    @ManyToOne(() => PostEntity, (post) => post.comments, { onDelete: "CASCADE" })
    @JoinColumn()
    post: PostEntity;

    @Column()
    postId: number;
}