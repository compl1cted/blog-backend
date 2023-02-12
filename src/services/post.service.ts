import { BaseService } from "./base.service";
import { PostEntity } from "../models/entities/post.entity";
import { AppDataSource } from "../config/database.config";

export class PostService extends BaseService<PostEntity> {
    constructor() {
        super(PostEntity, AppDataSource);
    }

    async FindByUserId(id: number) {
        return await this.find({ where: { User: { Id: id } } });
    }
}