import { AppDataSource } from "../config/database.config";
import { CommentEntity } from "../models/entities/comment.entity";
import { BaseService } from "./base.service";

export class CommentService extends BaseService<CommentEntity> {
    constructor() {
        super(CommentEntity, AppDataSource);
    }

    async FindByPostId(id: number) {
        return await this.find({ where: { Post: { Id: id } } });
    }
}