import { DatabaseService } from "./database.service";
import { RoleModel } from "../models/role.model";
import { AppDataSource } from "../config/database.config";

export class RoleService extends DatabaseService<RoleModel> {
    constructor() {
        super(AppDataSource.getRepository(RoleModel));
    }
}