import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { PostEntity } from "./post.entity";
import { BaseEntity } from "./base.entity";
import { TokenEntity } from "./token.entity";
import { CommentEntity } from "./comment.entity";

@Entity()
export class UserEntity extends BaseEntity {
    @Column()
    Username: string;
    @Column()
    Email: string;
    @Column()
    Password: string;
    @Column()
    ActivationLink: string;
    @Column()
    IsActivated: boolean = false;
    @OneToOne(() => TokenEntity)
    token: TokenEntity;
    @OneToMany(() => PostEntity, (post) => post.User)
    Posts: PostEntity[];
    @OneToMany(() => CommentEntity, (comment) => comment.User)
    Comments: CommentEntity[];

    constructor(username: string, email: string, password: string, activationLink: string) {
        super();

        this.Username = username;
        this.Email = email;
        this.Password = password;
        this.ActivationLink = activationLink;
    }
}