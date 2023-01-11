import { DatabaseService } from "./database.service";
import { RoleModel } from "../models/role.model";

export class RoleService extends DatabaseService<RoleModel> {
    constructor() {
        super();
    }
}