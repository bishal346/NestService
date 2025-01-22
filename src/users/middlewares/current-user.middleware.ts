import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(
        private userService : UsersService
    ){}
    async use(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const { userId } = req.session || {}
        console.log(req.session); 
        if(userId) {
            const user = await this.userService.findUserById(userId); 
            // @ts-ignore
            req.currentUser = user; 
        }
        
        next(); 
    }
}