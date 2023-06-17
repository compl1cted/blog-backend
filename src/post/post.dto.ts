import { PostEntity } from "./post.entity";

export class CreatePostDto {
    title: string;
    content: string;
    date: string;
    userId: number;
}

export class PostDto {
    id: number;
    title: string;
    content: string;
    date: string;
    userId: number;

    constructor(postEntity: PostEntity) {
        this.id = postEntity.id;
        this.title = postEntity.title;
        this.content = postEntity.content;
        this.date = postEntity.date;
        this.userId = postEntity.userId;
    }
}