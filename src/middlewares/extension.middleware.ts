import { Injectable, NestMiddleware } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { NextFunction, Request, Response } from "express";
import { Extension, ExtensionDocument } from "src/schemas/extension.schema";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { ExtensionService } from "src/extension/extension.service";



@Injectable()

export class ExtensionMiddleware implements NestMiddleware {
    // constructor(@InjectModel(Extension.name) private extensionModel: SoftDeleteModel<ExtensionDocument>) { }
    constructor(private readonly extensionService: ExtensionService) {}
    
    use(req: Request, res: Response, next: NextFunction) {
        const extension = this.extensionService
        next();
    }
}