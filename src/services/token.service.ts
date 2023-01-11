import { TokenModel } from "../models/token.model";
import { DatabaseService } from "./database.service";

export class TokenService extends DatabaseService<TokenModel> {
    constructor() {
        super();
    }
}