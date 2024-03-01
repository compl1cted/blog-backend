import { HttpError } from "../utils/http-errors";
import { CreatePostDto, PostDto } from "./post.dto";
import { PostRepositoryTypeORM } from "./post.repository";

export class PostService {
    constructor(private readonly postRepository: PostRepositoryTypeORM) {}

    async create(createPostDto: CreatePostDto): Promise<PostDto> {
        const newPost = await this.postRepository.create(createPostDto);
        if (!newPost) {
            throw HttpError.ServerError("Failed to create user!");
        }

        return newPost;
    }

    async findByUserId(id: number) {
        return await this.postRepository.findByUserId(id);
    }

    async findByTitle(title: string): Promise<PostDto[]> {
        return await this.postRepository.findByTitle(title);
    }

    async findOne(id: number): Promise<PostDto | null> {
        const post = await this.postRepository.findOneById(id);
        if (!post) {
            throw new Error();
        }
        return post;
    }

    async findAll() {
        return await this.postRepository.findAll();
    }

    async update(id: number, updateDto: Partial<PostDto>) {
        return await this.postRepository.update(id, updateDto);
    }

    async delete(id: number): Promise<void> {
        await this.postRepository.delete(id);
    }
}