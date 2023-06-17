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

    constructor(userEntity: UserEntity) {
        this.id = userEntity.id;
        this.username = userEntity.username;
        this.email = userEntity.email;
        this.isActivated = userEntity.isActivated;
    }
}