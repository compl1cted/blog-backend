import { AppDataSource } from "../config/database.config";
import { CommentEntity } from "../models/comment.entity";
import { BaseService } from "./base.service";

export class CommentService extends BaseService<CommentEntity> {
    constructor() {
        super(CommentEntity, AppDataSource);
    }

    async GetByPostId(id: number) {
        this.find({ where: { Id: id } });
    }
}