import { PostEntity } from "./post.entity";
import { CreatePostDto, PostDto, PostEntityToDto, UpdatePostDto } from "./post.dto";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/database.config";
export class PostRepositoryTypeORM {
    private readonly repository: Repository<PostEntity>;
    constructor() {
        this.repository = new Repository<PostEntity>(PostEntity, AppDataSource.createEntityManager());
    }
    
    async create(createPostDto: CreatePostDto): Promise<PostDto | null> {
        const newPost = await this.repository.save(createPostDto);
        if (!newPost) {
            return null;
        }

        return PostEntityToDto(newPost);
    }
    async findAll(): Promise<PostDto[]> {
        const postEntities = await this.repository.find();
        return postEntities.map(entity => PostEntityToDto(entity));
    }

    async findOneById(id: number): Promise<PostDto | null> {
        const postEntity = await this.repository.findOneBy({id});
        if (!postEntity) {
            return null;
        }

        return PostEntityToDto(postEntity);
    }
    
    async findByTitle(title: string): Promise<PostDto[]> {
        const postEntities = await this.repository.findBy({
            title
        });
        return postEntities.map(entity => PostEntityToDto(entity));
    }

    async findByUserId(id: number): Promise<PostDto[]> {
        const postEntities = await this.repository.findBy({
            user: {id}
        });
        return postEntities.map(entity => PostEntityToDto(entity));
    }

    async update(id: number, updatePostDto: UpdatePostDto) {
        await this.repository.update(id, updatePostDto);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}