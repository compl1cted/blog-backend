import { UserJwtPayload } from "./jwt_payload.dto";

export class TokensDto {
    AccessToken: string;
    RefreshToken: string;
    User: UserJwtPayload;

    constructor(accessToken: string, refreshToken: string, user: UserJwtPayload) {
        this.AccessToken = accessToken;
        this.RefreshToken = refreshToken;
        this.User = user;
    }
}