import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../database/base.entity";
import { UserEntity } from "../user/user.entity";
import { CreateTokenDto } from "./token.dto";

@Entity()
export class TokenEntity extends BaseEntity {
    @Column()
    refreshToken: string;

    @OneToOne(() => UserEntity, { nullable: false, eager: true})
    @JoinColumn()
    user: UserEntity;

    @Column()
    userId: number;

    constructor(createTokenDto: CreateTokenDto) {
        super();

        this.refreshToken = createTokenDto?.refreshToken;
        this.userId = createTokenDto?.userId;
    }
}