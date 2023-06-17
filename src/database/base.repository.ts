import { EntityTarget, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { AppDataSource } from "./database.config";

export class BaseRepository<Entity extends BaseEntity> extends Repository<Entity> {

    constructor(entity: EntityTarget<Entity>) {
        super(entity, AppDataSource.createEntityManager());
    }
}