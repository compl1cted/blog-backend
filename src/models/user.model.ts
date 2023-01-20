import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { PostModel } from "./post.model";
import { ModelTemplate } from "./template.model";
import { TokenModel } from "./token.model";

@Entity()
export class UserModel extends ModelTemplate {
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
    @OneToOne(() => TokenModel)
    token: TokenModel;
    @OneToMany(() => PostModel, (post) => post.User)
    Posts: PostModel[];

    constructor(username: string, email: string, password: string, activationLink: string) {
        super();

        this.Username = username;
        this.Email = email;
        this.Password = password;
        this.ActivationLink = activationLink;
    }
}