import { UserModel } from "../models/user.model";
import { DatabaseService } from "./database.service";

export class UserService extends DatabaseService<UserModel> {
    constructor() {
        super();
    }
}