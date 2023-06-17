import { CreateUserDto, UserDto } from "./user.dto";
import { UserRepository } from "./user.repository";
import { HttpError } from "../errors/http-errors";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(createUserDto: CreateUserDto): Promise<UserDto> {
        const newUser = await this.userRepository.create(createUserDto);
        return new UserDto(newUser);
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOneBy({id});
        if (!user) {
            throw HttpError.BadRequest("User not found!");
        }

        return user;
    }

    async findByUsername(username: string) {
        return await this.userRepository.FindByUsername(username);
    }

    async findByEmail(email: string) {
        return await this.userRepository.FindByEmail(email);
    }

    async findByActivationLink(activationLink: string) {
        return await this.userRepository.FindByActivationLink(activationLink);
    }

    async findByUsernameOrEmail(usernameOrEmail: string): Promise<UserDto | null> {
        const user = await this.userRepository.FindByUsernameOrEmail(usernameOrEmail);
        if (!user) {
            return null;
        }
        return new UserDto(user);
    }

    async update(userId: number, updateData: Partial<UserDto>) {
        return await this.userRepository.update(userId, updateData);
    }

    async updateToken(userId: number, newToken: string) {
        return await this.userRepository.update(userId, {token: {refreshToken: newToken}});
    }

    async updateLink(userId: number, link: string) {
        return await this.userRepository.update(userId, {activationLink: link});
    }

    async delete(id: number) {
        return await this.userRepository.delete({id});
    }
}