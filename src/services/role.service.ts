import { BaseService } from "./base.service";
import { RoleEntity } from "../models/entities/role.entity";
import { AppDataSource } from "../config/database.config";

export class RoleService extends BaseService<RoleEntity> {
    constructor() {
        super(RoleEntity, AppDataSource);
    }

}