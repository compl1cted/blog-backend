import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { PostEntity } from "../post/post.entity";
import { BaseEntity } from "../database/base.entity";
import { TokenEntity } from "../token/token.entity";
import { CommentEntity } from "../comment/comment.entity";

@Entity()
export class UserEntity extends BaseEntity {
    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    activationLink: string;

    @Column({ default: false })
    isActivated: boolean;

    @OneToOne(() => TokenEntity)
    token: TokenEntity;

    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];

    constructor(username: string, email: string, password: string, activationLink: string) {
        super();

        this.username = username;
        this.email = email;
        this.password = password;
        this.activationLink = activationLink;
    }
}