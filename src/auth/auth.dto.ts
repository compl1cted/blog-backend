import { UserDto } from "../user/user.dto";

export class TokensDto {
    AccessToken: string;
    RefreshToken: string;
    User: UserDto;

    constructor(accessToken: string, refreshToken: string, user: UserDto) {
        this.AccessToken = accessToken;
        this.RefreshToken = refreshToken;
        this.User = user;
    }
}