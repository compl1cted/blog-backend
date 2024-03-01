import { UserDto } from "../user/user.dto";

export class AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: UserDto;

    constructor(accessToken: string, refreshToken: string, user: UserDto) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.user = user;
    }
}