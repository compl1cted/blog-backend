import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { PostEntity } from "./post.entity";
import { UserEntity } from "./user.enity";

@Entity()
export class CommentEntity extends BaseEntity {
    @Column()
    Text: string;
    @Column()
    Date: string;
    @ManyToOne(() => UserEntity, (user) => user.Comments, { eager: true })
    @JoinColumn()
    User: UserEntity;
    @ManyToOne(() => PostEntity, (post) => post.Comments, { eager: true })
    @JoinColumn()
    Post: PostEntity;

    constructor(text: string, date: string, post: PostEntity, user: UserEntity) {
        super();

        this.Text = text;
        this.Date = date;
        this.Post = post;
        this.User = user;
    }
}