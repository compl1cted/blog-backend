import { UserDto } from "../user/user.dto";

export class TokenPayload {
    public payload: UserDto;
    public iat: number;
    public exp: number;
}