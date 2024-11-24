import {Exclude, Expose} from "class-transformer";

@Exclude()
export class CreateUserDto {
    @Expose()
    username: string;

    @Expose()
    email: string;

    @Expose()
    password: string;

    @Expose()
    activationLink: string;
}
