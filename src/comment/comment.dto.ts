import { CommentEntity } from "./comment.entity";

export class CreateCommentDto {
    text: string;
    userId: number;
    postId: number;
}

export class CommentDto {
    id: number;
    text: string;
    userId: number;
    postId: number;

    constructor(id: number, text: string, userId: number, postId: number) {
        this.id = id;
        this.text = text;
        this.userId = userId;
        this.postId = postId;
    }
}

export type UpdateCommentDto = Partial<CommentDto>;

export const CommentEntityToDto = (commentEntity: CommentEntity) => {
    const { id, text, userId, postId } = commentEntity;
    return new CommentDto(id, text, userId, postId);
}