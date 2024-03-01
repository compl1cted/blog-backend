import { CreateUserDto, UpdateUserDto, UserDto } from "./user.dto";
import { HttpError } from "../utils/http-errors";
import { UserRepositoryTypeORM } from "./user.repository";

export class UserService {
    constructor(private readonly userRepository: UserRepositoryTypeORM) {}

    async create(createUserDto: CreateUserDto): Promise<UserDto> {
        const newUser = await this.userRepository.create(createUserDto);
        if (!newUser) throw HttpError.BadRequest("Failed to create user!");
        return newUser;
    }

    async findAll(): Promise<UserDto[]> {
        return await this.userRepository.findAll();
    }

    async findOne(id: number): Promise<UserDto> {
        const user = await this.userRepository.findOneById(id);
        if (!user) throw HttpError.BadRequest("User not found!");
        return user;
    }

    async findByUsername(username: string): Promise<UserDto | null> {
        const user = await this.userRepository.findOneByUsername(username);
        if (!user) return null;
        return user;
    }

    async findByEmail(email: string): Promise <UserDto | null> {
        const user = await this.userRepository.findOneByEmail(email);
        if (!user) return null;
        return user;
    }

    async findByActivationLink(activationLink: string): Promise<UserDto | null> {
        const user = await this.userRepository.findOneByActivationLink(activationLink);
        if (!user) return null;
        return user;
    }

    async findByUsernameOrEmail(usernameOrEmail: string): Promise<UserDto | null> {
        const user = await this.userRepository.findOneByUsernameOrEmail(usernameOrEmail);
        if (!user) return null;
        return user;
    }

    async update(userId: number, updateData: UpdateUserDto) {
        return await this.userRepository.update(userId, updateData);
    }

    async updateToken(userId: number, newToken: string) {
        return await this.userRepository.updateToken(userId, newToken);
    }

    async updateLink(userId: number, activationLink: string) {
        return await this.userRepository.update(userId, { activationLink });
    }

    async delete(id: number) {
        return await this.userRepository.delete(id);
    }
}