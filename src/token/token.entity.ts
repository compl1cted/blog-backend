import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../database/base.entity";
import { UserEntity } from "../user/user.entity";

@Entity()
export class TokenEntity extends BaseEntity {
    @Column()
    refreshToken: string;

    @OneToOne(() => UserEntity, { nullable: false, eager: true, cascade: true })
    @JoinColumn()
    user: UserEntity;

    @Column()
    userId: number;

    constructor(refreshToken: string, user: UserEntity) {
        super();

        this.refreshToken = refreshToken;
        this.user.id = user.id;
    }
}