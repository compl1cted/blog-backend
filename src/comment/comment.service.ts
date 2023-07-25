import { HttpError } from "../errors/http-errors";
import { CommentRepository } from "./comment.repository";
import { CommentDto, CreateCommentDto } from "./comment.dto";

export class CommentService {
    constructor(private readonly commentRepository: CommentRepository) {}

    async create(createCommentDto: CreateCommentDto) {
        return await this.commentRepository.save(createCommentDto);
    }

    async findAll() {
        return await this.commentRepository.find();
    }
    
    async findOne(id: number) {
        const comment = await this.commentRepository.findBy({id});
        if (!comment) {
            throw HttpError.BadRequest("Comment not found!");
        }

        return comment;
    }

    async findByPostId(postId: number): Promise<CommentDto[]> {
        return await this.commentRepository.findBy({postId});
    }

    async update(id: number, updateDto: Partial<CommentDto>) {
        return await this.commentRepository.update(id, updateDto);
    }

    async delete(id: number) {
        return await this.commentRepository.delete({id});
    }
}