import { DataSource, EntityTarget, FindOptionsWhere, Repository } from "typeorm";
import { BaseEntity } from "../models/entities/base.entity";

export class BaseService<Entity extends BaseEntity> extends Repository<Entity> {

    constructor(entity: EntityTarget<Entity>, dataSource: DataSource) {
        super(entity, dataSource.createEntityManager());
    }

    async Create(newEntity: Entity): Promise<Entity> {
        return await this.save(newEntity);
    }

    async FindAll(): Promise<Entity[]> {
        return await this.find();
    }

    async FindOne(id: number): Promise<Entity | null> {
        return await this.findOneBy({ Id: id } as FindOptionsWhere<Entity>);
    }

    async Exists(id: number): Promise<Boolean> {
        let Row = await this.exist({ where: { Id: id } as FindOptionsWhere<Entity> });
        return Row !== null;
    }

    async Update(updateEntity: Entity) {
        return await this.save(updateEntity);
    }

    async Remove(id: number): Promise<any> {
        return await this.delete({ Id: id } as FindOptionsWhere<Entity>);
    }
}