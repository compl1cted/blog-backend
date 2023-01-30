import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.enity";

@Entity()
export class TokenEntity extends BaseEntity {
    @Column()
    RefreshToken: string;
    @OneToOne(() => UserEntity, { nullable: false, eager: true, cascade: true })
    @JoinColumn()
    User: UserEntity;

    constructor(RefreshToken: string, user: UserEntity) {
        super();

        this.RefreshToken = RefreshToken;
        this.User = user;
    }
}