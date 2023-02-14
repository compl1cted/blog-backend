export class UserDto {
    Id: number;
    Username: string;
    Email: string;
    IsActivated: boolean;

    constructor(id: number, username: string, email: string, isActivated: boolean) {
        this.Id = id;
        this.Username = username;
        this.Email = email;
        this.IsActivated = isActivated;
    }
}