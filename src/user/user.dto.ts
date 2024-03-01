import { UserEntity } from "./user.entity";

export class CreateUserDto {
    username: string;
    email: string;
    password: string;
    activationLink: string;
}

export class UserDto {
    id: number;
    username: string;
    email: string;
    password: string;
    isActivated: boolean;
    activationLink: string;

    constructor(id: number, username: string, email: string, isActivated: boolean, password: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.isActivated = isActivated;
        this.password = password;
    }
}

export type UpdateUserDto = Partial<UserDto>;

export const UserEntityToDto = (userEntity: UserEntity) => {
    const { id, username, email, isActivated, password } = userEntity;
    return new UserDto(id, username, email, isActivated, password);
}