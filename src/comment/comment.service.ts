import { HttpError } from "../utils/http-errors";
import { CommentDto, CreateCommentDto } from "./comment.dto";
import { CommentRepositoryTypeORM } from "./comment.repository";

export class CommentService {
    constructor(private readonly repository: CommentRepositoryTypeORM) {}

    async create(createCommentDto: CreateCommentDto) {
        const comment = await this.repository.create(createCommentDto);
        if (!comment) throw HttpError.ServerError("Failed to add comment!");
        return comment;
    }

    async findAll() {
        return await this.repository.findAll();
    }
    
    async findOneById(id: number) {
        const comment = await this.repository.findOneById(id);
        if (!comment) throw HttpError.BadRequest("Comment not found!");
        return comment;
    }

    async findByUserId(userId: number): Promise<CommentDto[]> {
        return await this.repository.findByUserId(userId);
    }

    async findByPostId(postId: number): Promise<CommentDto[]> {
        return await this.repository.findByPostId(postId);
    }

    async update(id: number, updateDto: Partial<CommentDto>) {
        return await this.repository.update(id, updateDto);
    }

    async delete(id: number) {
        return await this.repository.delete(id);
    }
}