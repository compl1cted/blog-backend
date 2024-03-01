import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntityTypeORM } from "../config/entity.typeorm";
import { CommentEntity } from "../comment/comment.entity";
import { UserEntity } from "../user/user.entity";
import { CreatePostDto } from "./post.dto";

@Entity()
export class PostEntity extends BaseEntityTypeORM {
    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn()
    user: UserEntity;

    @Column()
    userId: number;

    @OneToMany(() => CommentEntity, (comment) => comment.post)
    comments: CommentEntity[];

    constructor(createPostDto: CreatePostDto) {
        super();

        this.title = createPostDto?.title;
        this.content = createPostDto?.content;
        this.userId = createPostDto?.userId;
    }
}