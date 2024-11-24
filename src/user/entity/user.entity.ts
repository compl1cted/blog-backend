import { Column, Entity, OneToMany } from "typeorm";
import { PostEntity } from "../../post/entity/post.entity";
import { BaseEntityTypeORM } from "../../common/typeorm/entity.typeorm";
import { CommentEntity } from "../../comment/entity/comment.entity";

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

    @Column()
    refreshToken: string;

    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];
}
