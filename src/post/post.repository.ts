import { PostEntity } from "./post.entity";
import { BaseRepository } from "../database/base.repository";

export class PostRepository extends BaseRepository<PostEntity> {
    constructor() {
        super(PostEntity);
    }

    async findByUserId(id: number) {
        return await this.findBy({user: {id}});
    }
}