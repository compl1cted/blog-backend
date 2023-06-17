import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../database/base.entity";
import { PostEntity } from "../post/post.entity";
import { UserEntity } from "../user/user.entity";

@Entity()
export class CommentEntity extends BaseEntity {
    @Column()
    text: string;

    @Column()
    date: string;

    @ManyToOne(() => UserEntity, (user) => user.comments, { eager: true })
    @JoinColumn()
    user: UserEntity;

    @Column()
    userId: number;

    @ManyToOne(() => PostEntity, (post) => post.comments, { eager: true })
    @JoinColumn()
    post: PostEntity;

    @Column()
    postId: number;
}