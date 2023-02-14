import { UserDto } from "./user.dto";

export class UserJwtPayload {
    public payload: UserDto;
    public iat: number;
    public exp: number;

    constructor(id: number, username: string, email: string, isActivated: boolean) {
        this.payload = new UserDto(id, username, email, isActivated);
    }
}