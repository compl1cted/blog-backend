import {Exclude, Expose} from "class-transformer";

@Exclude()
export class UserDto {
    @Expose()
    id: number;

    @Expose()
    username: string;

    @Expose()
    email: string;

    @Expose()
    password: string;

    @Expose()
    isActivated: boolean;

    @Expose()
    activationLink: string;
}
