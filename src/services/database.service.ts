import { DeleteResult, FindOptionsWhere, Repository, UpdateResult, } from "typeorm";
import { ModelTemplate } from "../models/template.model";

export class DatabaseService<DataModel extends ModelTemplate> {

    constructor(protected repository: Repository<DataModel>) { }

    async Create(dataModel: DataModel): Promise<DataModel> {
        return await this.repository.save(dataModel);
    }

    async FindOne(entity_id: number): Promise<DataModel | null> {
        return await this.repository.findOneBy({ Id: entity_id } as FindOptionsWhere<DataModel>);
    }

    async FindAll(): Promise<DataModel[]> {
        return await this.repository.find();
    }
    async Exists(entity_id: number): Promise<boolean> {
        return await this.repository.exist({ where: { Id: entity_id } as FindOptionsWhere<DataModel> });
    }

    async Update(dataModel: DataModel): Promise<DataModel> {
        return await this.repository.save(dataModel);
    }

    async Delete(entity_id: number): Promise<DeleteResult> {
        return await this.repository.delete({ Id: entity_id } as FindOptionsWhere<DataModel>);
    }
}