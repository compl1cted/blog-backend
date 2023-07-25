import { UserDto } from "../user/user.dto";

export class CreateTokenDto {
    refreshToken: string;
    userId: number;
}

export class TokenPayload {
    public payload: UserDto;
    public iat: number;
    public exp: number;
}