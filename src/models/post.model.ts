import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ModelTemplate } from "./template.model";
import { UserModel } from "./user.model";

@Entity()
export class PostModel extends ModelTemplate {
    @Column()
    Title: string;
    @Column()
    Content: string;
    @Column()
    Date: string;
    @ManyToOne(() => UserModel, (user) => user.Posts, { eager: true })
    @JoinColumn()
    User: UserModel;

    constructor(title: string, content: string, date: string, user: UserModel) {
        super();

        this.Title = title;
        this.Content = content;
        this.Date = date;
        this.User = user;
    }
}