import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../database/base.entity";
import { CommentEntity } from "../comment/comment.entity";
import { UserEntity } from "../user/user.entity";
import { CreatePostDto } from "./post.dto";

@Entity()
export class PostEntity extends BaseEntity {
    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    date: string;

    @ManyToOne(() => UserEntity, (user) => user.posts, { eager: true })
    @JoinColumn()
    user: UserEntity;

    @Column()
    userId: number;

    @OneToMany(() => CommentEntity, (comment) => comment.post)
    comments: CommentEntity[];

    constructor(createPostDto: CreatePostDto) {
        super();

        this.title = createPostDto.title;
        this.content = createPostDto.content;
        this.date = createPostDto.date;
        this.userId = createPostDto.userId;
    }
}