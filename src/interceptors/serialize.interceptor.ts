import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";
// import { UserDto } from "src/users/dto/user.dto";
import { UseInterceptors } from "@nestjs/common";

interface ClassConstructor {
    new (...args: any[]): {}
}

export function customSerializeDecorator(dto : ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto : any){}
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map((data : any) => {
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true, 
                })
            })
        )
    }
}