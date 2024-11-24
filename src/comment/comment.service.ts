import { HttpError } from "../common/error/http-errors";
import { CommentDto } from "./dto/comment.dto";
import { Repository } from "typeorm";
import { CommentEntity } from "./entity/comment.entity";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {plainToInstance} from "class-transformer";

export class CommentService {
    constructor(private readonly repository: Repository<CommentEntity>) {}

    async create(dto: CreateCommentDto) {
        const comment = await this.repository.save(this.repository.create(dto));
        if (!comment) throw HttpError.ServerError("Failed to add comment!");
        return plainToInstance(CommentDto, comment, {excludeExtraneousValues: true });
    }

    async findAll() {
        const comments = await this.repository.find();
        return plainToInstance(CommentDto, comments, {excludeExtraneousValues: true });
    }

    async findOneById(id: number) {
        const comment = await this.repository.findOneBy({ id });
        if (!comment) throw HttpError.BadRequest("Comment not found!");
        return plainToInstance(CommentDto, comment, {excludeExtraneousValues: true });
    }

    async findByUserId(userId: number): Promise<CommentDto[]> {
        const comments = await this.repository.findBy({ userId });
        return plainToInstance(CommentDto, comments, {excludeExtraneousValues: true });
    }

    async findByPostId(postId: number): Promise<CommentDto[]> {
        const comments = await this.repository.findBy({ postId });
        return plainToInstance(CommentDto, comments, {excludeExtraneousValues: true });
    }

    async update(id: number, updateDto: Partial<CommentDto>) {
        await this.repository.update(id, updateDto);
        const comment = await this.repository.findOneBy({ id });
        return plainToInstance(CommentDto, comment, {excludeExtraneousValues: true });
    }

    async delete(id: number) {
        return await this.repository.delete(id);
    }
}
