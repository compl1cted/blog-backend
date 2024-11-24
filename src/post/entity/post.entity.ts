import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntityTypeORM } from "../../common/typeorm/entity.typeorm";
import { CommentEntity } from "../../comment/entity/comment.entity";
import { UserEntity } from "../../user/entity/user.entity";

@Entity()
export class PostEntity extends BaseEntityTypeORM {
    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn()
    user: UserEntity;

    @Column()
    userId: number;

    @OneToMany(() => CommentEntity, (comment) => comment.post)
    comments: CommentEntity[];
}
