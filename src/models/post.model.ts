import { Column, Entity, ManyToOne } from "typeorm";
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
    @Column()
    User: number;
}