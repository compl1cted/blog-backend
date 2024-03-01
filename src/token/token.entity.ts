import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntityTypeORM } from "../config/entity.typeorm";
import { UserEntity } from "../user/user.entity";
import { CreateTokenDto } from "./token.dto";

@Entity()
export class TokenEntity extends BaseEntityTypeORM {
    @Column({ unique: true })
    refreshToken: string;

    @OneToOne(() => UserEntity, { nullable: false})
    @JoinColumn()
    user: UserEntity;

    @Column({ unique: false })
    userId: number;

    constructor(createTokenDto: CreateTokenDto) {
        super();

        this.refreshToken = createTokenDto?.refreshToken;
        this.userId = createTokenDto?.userId;
    }
}