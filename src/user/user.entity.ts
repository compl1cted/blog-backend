import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { PostEntity } from "../post/post.entity";
import { BaseEntityTypeORM } from "../config/entity.typeorm";
import { TokenEntity } from "../token/token.entity";
import { CommentEntity } from "../comment/comment.entity";
import { CreateUserDto } from "./user.dto";

@Entity()
export class UserEntity extends BaseEntityTypeORM {
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

    constructor(createUserDto: CreateUserDto) {
        super();

        this.username = createUserDto?.username;
        this.email = createUserDto?.email;
        this.password = createUserDto?.password;
        this.activationLink = createUserDto?.activationLink;
    }
}