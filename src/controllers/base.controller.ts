import { NextFunction, Request, Response } from "express";
import { BaseEntity } from "../models/entities/base.entity";
import { BaseService } from "../services/base.service";

export class BaseController<Service extends BaseService<Entity>, Entity extends BaseEntity> {

    constructor(protected Service: Service) { }

    public FindOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const entity = await this.Service.FindOne(parseInt(id));
            res.json(entity);
        } catch (error) {
            next(error);
        }
    }
    public FindAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const entities = await this.Service.FindAll();
            res.json(entities);
        } catch (error) {
            next(error);
        }
    }

    public Delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const postData = await this.Service.Remove(parseInt(id));
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }
}