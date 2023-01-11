import { DatabaseService } from "./database.service";
import { PostModel } from "../models/post.model";

export class PostService extends DatabaseService<PostModel> {
    constructor() {
        super();
    }
}