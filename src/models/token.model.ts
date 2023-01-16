import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { ModelTemplate } from "./template.model";
import { UserModel } from "./user.model";

@Entity()
export class TokenModel extends ModelTemplate {
    @Column()
    RefreshToken: string;
    @OneToOne(() => UserModel, { nullable: false, eager: true, cascade: true })
    @JoinColumn()
    User: UserModel;

    constructor(RefreshToken: string, user: UserModel) {
        super();

        this.RefreshToken = RefreshToken;
        this.User = user;
    }
}