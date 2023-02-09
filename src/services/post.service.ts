import { BaseService } from "./base.service";
import { PostEntity } from "../models/post.entity";
import { AppDataSource } from "../config/database.config";

export class PostService extends BaseService<PostEntity> {
    constructor() {
        super(PostEntity, AppDataSource);
    }
}