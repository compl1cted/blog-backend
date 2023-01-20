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
    Date: Date;
    @ManyToOne(() => UserModel, (user) => user.Posts)
    @JoinColumn()
    User: UserModel;

    constructor(title: string, content: string, date: Date, user: UserModel) {
        super();

        this.Title = title;
        this.Content = content;
        this.Date = date;
        // this.User = user;
    }
}