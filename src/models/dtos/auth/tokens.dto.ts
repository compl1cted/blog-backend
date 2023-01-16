export class TokensDto {
    AccessToken: string;
    RefreshToken: string;
    constructor(accessToken: string, refreshToken: string) {
        this.AccessToken = accessToken;
        this.RefreshToken = refreshToken;
    }
}