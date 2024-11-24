import {Exclude, Expose} from "class-transformer";

@Exclude()
export class CreateCommentDto {
    @Expose()
    text: string;

    @Expose()
    userId: number;

    @Expose()
    postId: number;
}
