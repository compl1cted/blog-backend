import { UserDto } from "../user/user.dto";
import { TokenEntity } from "./token.entity";

export class CreateTokenDto {
    refreshToken: string;
    userId: number;
}

export class TokenDto {
    id: number;
    refreshToken: string;
    userId: number;

    constructor (id: number, refreshToken: string, userId: number) {
        this.id = id;
        this.refreshToken = refreshToken;
        this.userId = userId;
    }
}

export type UpdateTokenDto = Partial<TokenDto>;

export const TokenEntityToDto = (entity: TokenEntity) => {
    const { id, refreshToken, userId } = entity;
    return new TokenDto(id, refreshToken, userId);
}

export class TokenPayload {
    payload: UserDto;
}