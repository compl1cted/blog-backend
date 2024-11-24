import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntityTypeORM } from "../../common/typeorm/entity.typeorm";
import { PostEntity } from "../../post/entity/post.entity";
import { UserEntity } from "../../user/entity/user.entity";

@Entity()
export class CommentEntity extends BaseEntityTypeORM {
    @Column()
    text: string;

    @ManyToOne(() => UserEntity, (user) => user.comments)
    @JoinColumn()
    user: UserEntity;

    @Column()
    userId: number;

    @ManyToOne(() => PostEntity, (post) => post.comments, { onDelete: "CASCADE" })
    @JoinColumn()
    post: PostEntity;

    @Column()
    postId: number;
}
