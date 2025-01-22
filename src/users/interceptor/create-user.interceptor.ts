import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { Observable } from "rxjs";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userSevice : UsersService){}
    
    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest(); 
        const { userId } = request.session; 

        if(userId) {
            const user = await this.userSevice.findUserById(userId)
            request.currentUser = user; 
        }

        return handler.handle(); 
    }
}