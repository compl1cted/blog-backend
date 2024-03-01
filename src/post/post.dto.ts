import { PostEntity } from "./post.entity";

export class CreatePostDto {
    title: string;
    content: string;
    userId: number;
}

export class PostDto {
    id: number;
    title: string;
    content: string;
    date: Date;
    userId: number;

    constructor(id: number, title: string, content: string, created_at: Date, userId: number) {        
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = created_at;
        this.userId = userId;
    }
}

export const PostEntityToDto = (postEntity: PostEntity) => {
    const { id, title, content, created_at, userId} = postEntity;
    return new PostDto(id, title, content, created_at, userId);
}

export type UpdatePostDto = Partial<PostDto>;