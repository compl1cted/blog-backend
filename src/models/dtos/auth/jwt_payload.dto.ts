export class UserJwtPayload {
    public Id: number;
    public Username: string;
    public Email: string;
    public IsActivated: boolean;

    constructor(id: number, username: string, email: string, isActivated: boolean) {
        this.Id = id
        this.Username = username;
        this.Email = email;
        this.IsActivated = isActivated;
    }
}