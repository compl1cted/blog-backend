import { DeleteResult, EntitySchema, Repository } from "typeorm";
import { AppDataSource } from "../config/database.config";
import { logger } from "../config/logger.config";

export class DatabaseService<DataModel extends EntitySchema> {
    private entity: DataModel;
    protected repository: Repository<any>;
    constructor() {
        this.repository = AppDataSource.getRepository(this.entity);
    }
    async Create(dataModel: DataModel): Promise<DataModel | undefined> {
        try {
            return await this.repository.save(dataModel);
        }
        catch (error) {
            logger.error(error);
            throw new Error("Failed to create an entity! Internal server error!");
        }
    }

    async FindOne(entity_id: number): Promise<DataModel | undefined> {
        try {
            return await this.repository.findOneBy({ id: entity_id });
        }
        catch (error) {
            logger.error(error);
            throw new Error("Failed to find an entity! Internal server error!");
        }
    }

    async FindAll(): Promise<DataModel[] | undefined> {
        try {
            return await this.repository.find();
        }
        catch (error) {
            logger.error(error);
            throw new Error("Failed to find entities! Internal server error!");
        }
    }
    async Exists(entity_id: number): Promise<Boolean | undefined> {
        try {
            return await this.repository.exist({ where: { id: entity_id } });
        }
        catch (error) {
            logger.error(error);
            throw new Error("Failed to check if entity exists! Internal server error!");
        }
    }

    async Update(dataModel: DataModel): Promise<DataModel | undefined> {
        try {
            return await this.repository.save(dataModel);
        }
        catch (error) {
            logger.error(error);
            throw new Error("Failed to update an entity! Internal server error!");
        }
    }

    async Delete(entity_id: number): Promise<DeleteResult | undefined> {
        try {
            return await this.repository.delete(entity_id);
        }
        catch (error) {
            logger.error(error);
            throw new Error("Failed to delete an entity! Internal server error!");
        }
    }
}