import { UserDto } from "../../user/dto/user.dto";
import {Exclude, Expose} from "class-transformer";

@Exclude()
export class AuthResponse {
    @Expose()
    accessToken: string;

    @Exclude()
    refreshToken: string;

    @Expose()
    user: UserDto;
}
