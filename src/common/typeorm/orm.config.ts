import "reflect-metadata"
import * as path from "node:path";
import { DataSource, EntityTarget } from "typeorm"
import {ConfigService} from "../../config/config.service";
import {BaseEntityTypeORM} from "./entity.typeorm";
import {UserEntity} from "../../user/entity/user.entity";
import {PostEntity} from "../../post/entity/post.entity";
import {CommentEntity} from "../../comment/entity/comment.entity";

const configService = new ConfigService();

const dataSource = new DataSource({
    ...configService.typeormConfig,
    type: 'postgres',
    entities: [UserEntity, PostEntity, CommentEntity],
    migrations: [path.join(__dirname, '..', '..', '..', 'migrations', '*.{ts,js}')],
    synchronize: false,
    logging: true,
});

export const connectToDb = async (): Promise<void> => {
    dataSource.initialize()
        .then(() => {
            console.log("Database connection established!");
        })
        .catch((error: string) => console.log(error));
}

export function getRepository<Entity extends BaseEntityTypeORM>(entity: EntityTarget<Entity>) {
    return dataSource.getRepository(entity);
}


export default dataSource;
