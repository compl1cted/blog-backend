import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.enity";

@Entity()
export class PostEntity extends BaseEntity {
    @Column()
    Title: string;
    @Column()
    Content: string;
    @Column()
    Date: string;
    @ManyToOne(() => UserEntity, (user) => user.Posts, { eager: true })
    @JoinColumn()
    User: UserEntity;

    constructor(title: string, content: string, date: string, user: UserEntity) {
        super();

        this.Title = title;
        this.Content = content;
        this.Date = date;
        this.User = user;
    }
}