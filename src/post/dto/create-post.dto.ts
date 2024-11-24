import {Exclude, Expose} from "class-transformer";

@Exclude()
export class CreatePostDto {
    @Expose()
    title: string;

    @Expose()
    content: string;

    @Expose()
    userId: number;
}
