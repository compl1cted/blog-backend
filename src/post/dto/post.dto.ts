import {Exclude, Expose} from "class-transformer";

@Exclude()
export class PostDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    content: string;

    @Expose()
    date: Date;

    @Expose()
    userId: number;
}
