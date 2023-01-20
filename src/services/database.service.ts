import { Repository } from "typeorm";
import { ModelTemplate } from "../models/template.model";

export class DatabaseService<DataModel extends ModelTemplate> {
    constructor(public repository: Repository<DataModel>) { }
}