import {Exclude, Expose} from "class-transformer";

@Exclude()
export class CommentDto {
    @Expose()
    id: number;

    @Expose()
    text: string;

    @Expose()
    userId: number;

    @Expose()
    postId: number;
}
