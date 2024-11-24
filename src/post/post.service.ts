import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { HttpError } from "../common/error/http-errors";
import { PostEntity } from "./entity/post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostDto } from "./dto/post.dto";

export class PostService {
    constructor(private readonly postRepository: Repository<PostEntity>) {}

    async create(dto: CreatePostDto): Promise<PostDto> {
        const newPost = await this.postRepository.save(this.postRepository.create(dto));
        if (!newPost) {
            throw HttpError.ServerError("Failed to create user!");
        }

        return plainToInstance(PostDto, newPost, { excludeExtraneousValues: true });
    }

    async findByUserId(userId: number) {
        const posts = await this.postRepository.findBy({ userId });

        return plainToInstance(PostDto, posts, { excludeExtraneousValues: true });
    }

    async findByTitle(title: string): Promise<PostDto[]> {
        const posts = await this.postRepository.findBy({ title });
        return plainToInstance(PostDto, posts, { excludeExtraneousValues: true });
    }

    async findOne(id: number): Promise<PostDto | null> {
        const post = await this.postRepository.findOneBy({ id });
        if (!post) {
            throw new Error();
        }
        return plainToInstance(PostDto, post, { excludeExtraneousValues: true });
    }

    async findAll() {
        const posts = await this.postRepository.find();

        return plainToInstance(PostDto, posts, { excludeExtraneousValues: true });
    }

    async update(id: number, updateDto: Partial<PostDto>) {
        await this.postRepository.update(id, updateDto);
        const updatedPost = await this.postRepository.findOneBy({ id });

        return plainToInstance(PostDto, updatedPost, { excludeExtraneousValues: true });
    }

    async delete(id: number): Promise<void> {
        await this.postRepository.delete(id);
    }
}
