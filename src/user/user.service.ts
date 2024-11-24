import { plainToInstance } from "class-transformer";
import { HttpError } from "../common/error/http-errors";
import { Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entity/user.entity";

export class UserService {
    constructor(private readonly userRepository: Repository<UserEntity>) {}

    async create(dto: CreateUserDto): Promise<UserDto> {
        const newUser = await this.userRepository.save(this.userRepository.create(dto));
        if (!newUser) throw HttpError.BadRequest("Failed to create user!");
        return plainToInstance(UserDto, newUser, { excludeExtraneousValues: true });
    }

    async findAll(): Promise<UserDto[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<UserDto> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw HttpError.BadRequest("User not found!");
        return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
    }

    async findByUsername(username: string): Promise<UserDto | null> {
        const user =  await this.userRepository.findOneBy({ username })
        if (!user) return null;
        return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
    }

    async findByEmail(email: string): Promise <UserDto | null> {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) return null;
        return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
    }

    async findByActivationLink(activationLink: string): Promise<UserDto | null> {
        const user = await this.userRepository.findOneBy({ activationLink });
        if (!user) return null;
        return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
    }

    async findByUsernameOrEmail(usernameOrEmail: string): Promise<UserDto | null> {
        const user = await this.userRepository.findOneBy([
            { username: usernameOrEmail },
            { email: usernameOrEmail }
        ]);
        if (!user) return null;
        return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
    }

    async update(userId: number, updateData: Partial<UserDto>) {
        return await this.userRepository.update(userId, updateData);
    }

    async findByToken(refreshToken: string) {
        return await this.userRepository.findOneBy({ refreshToken });
    }

    async updateToken(userId: number, refreshToken: string ): Promise<void> {
        await this.userRepository.update({ id: userId }, { refreshToken})
    }

    async removeToken(refreshToken: string): Promise<void> {
        await this.userRepository.update({ refreshToken }, { refreshToken: null });
    }

    async delete(id: number) {
        return await this.userRepository.delete(id);
    }
}
