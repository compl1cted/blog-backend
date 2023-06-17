import { CommentEntity } from "./comment.entity";
import { BaseRepository } from "../database/base.repository";

export class CommentRepository extends BaseRepository<CommentEntity> {
    constructor() {
        super(CommentEntity);
    }

    async FindByPostId(id: number) {
        return await this.find({ where: { post: { id: id } } });
    }
}