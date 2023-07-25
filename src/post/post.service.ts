import { HttpError } from "../errors/http-errors";
import { CreatePostDto, PostDto } from "./post.dto";
import { PostRepository } from "./post.repository";

export class PostService {
    constructor(private readonly postRepository: PostRepository) {}

    async create(createPostDto: CreatePostDto): Promise<PostDto> {
        const newPost = await this.postRepository.save(createPostDto);
        return new PostDto(newPost);
    }

    async findByUserId(id: number) {
        return await this.postRepository.findByUserId(id);
    }

    async findOne(id: number) {
        const post = await this.postRepository.findOneBy({id});
        if (!post) {
            throw HttpError.BadRequest("Post not found!");
        }
        return post;
    }

    async findAll() {
        return await this.postRepository.find();
    }

    async update(id: number, updateDto: Partial<PostDto>) {
        return await this.postRepository.update(id, updateDto);
    }

    async delete(id: number) {
        return await this.postRepository.delete({id});
    }
}