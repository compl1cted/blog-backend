import { CommentEntity } from "./comment.entity";
import { CommentDto, CommentEntityToDto, CreateCommentDto, UpdateCommentDto } from "./comment.dto";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/database.config";

export class CommentRepositoryTypeORM  {
    private readonly repository: Repository<CommentEntity>;
    constructor() {
        this.repository = new Repository<CommentEntity>(CommentEntity, AppDataSource.createEntityManager())
    }

    async create(createCommentDto: CreateCommentDto): Promise<CommentDto | null> {
        const newCommentEntity = await this.repository.save(createCommentDto);
        if (!newCommentEntity) return null;
        return CommentEntityToDto(newCommentEntity);
    }

    async findAll(): Promise<CommentDto[]> {
        const commentEntities = await this.repository.find();
        return commentEntities.map(entity => CommentEntityToDto(entity));
    }

    async findOneById(id: number): Promise<CommentDto | null> {
        const commentEntity = await this.repository.findOneBy({id});
        if (!commentEntity) return null;
        return CommentEntityToDto(commentEntity);
    }

    async findByPostId(postId: number): Promise<CommentDto[]> {
        const commentEntities = await this.repository.findBy({postId});
        return commentEntities.map(entity => CommentEntityToDto(entity));
    }

    async findByUserId(userId: number) {
        const commentEntities = await this.repository.findBy({userId});

        return commentEntities.map(entity => CommentEntityToDto(entity));
    }

    async update(id: number, updateCommentDto: UpdateCommentDto): Promise<void> {
        await this.repository.update(id, updateCommentDto);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}