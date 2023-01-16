export class UserJwtPayload {
    public Id: number;
    public Username: string;
    public Email: string;

    constructor(id: number, username: string, email: string) {
        this.Id = id
        this.Username = username;
        this.Email = email;
    }
}