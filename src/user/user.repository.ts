import { UserEntity } from "./user.entity";
import { CreateUserDto, UpdateUserDto, UserDto, UserEntityToDto } from "./user.dto";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/database.config";

export class UserRepositoryTypeORM {
    private readonly repository: Repository<UserEntity>;
    constructor() {
        this.repository = new Repository<UserEntity>(UserEntity, AppDataSource.createEntityManager());
    }

    async create(createUserDto: CreateUserDto): Promise<UserDto | null> {
        const newUserEntity = await this.repository.save(createUserDto);
        if (!newUserEntity) return null;
        return UserEntityToDto(newUserEntity);
    }

    async findOneById(id: number): Promise<UserDto | null> {
        const userEntity = await this.repository.findOneBy({ id });
        if (!userEntity) return null;
        return UserEntityToDto(userEntity);
    }

    async findAll(): Promise<UserDto[]> {
        const userEntities = await this.repository.find();
        return userEntities.map(entity => UserEntityToDto(entity));
    }

    async findOneByUsernameOrEmail(usernameOrEmail: string): Promise<UserDto | null> {
        const userEntity = await this.repository.findOneBy([
            { username: usernameOrEmail },
            { email: usernameOrEmail }
        ]);

        if (!userEntity) return null;
        return UserEntityToDto(userEntity);
    }

    async findOneByUsername(Username: string): Promise<UserDto | null> {
        const userEntity = await this.repository.findOneBy({ username: Username });
        if (!userEntity) return null;
        return UserEntityToDto(userEntity);
    }

    async findOneByEmail(Email: string): Promise<UserDto | null> {
        const userEntity = await this.repository.findOneBy({ email: Email });
        if (!userEntity) return null;
        return UserEntityToDto(userEntity);
    }

    async findOneByActivationLink(ActivationLink: string): Promise<UserDto | null> {
        const userEntity = await this.repository.findOneBy({ activationLink: ActivationLink });
        if (!userEntity) return null;
        return UserEntityToDto(userEntity);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
        await this.repository.update(id, updateUserDto);
    }

    async updateToken(id: number, newToken: string): Promise<void> {
        await this.repository.update(id, { token: { refreshToken: newToken } });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}