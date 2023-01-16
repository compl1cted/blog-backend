import { DatabaseService } from "./database.service";
import { PostModel } from "../models/post.model";
import { AppDataSource } from "../config/database.config";

export class PostService extends DatabaseService<PostModel> {
    constructor() {
        super(AppDataSource.getRepository(PostModel));
    }
}