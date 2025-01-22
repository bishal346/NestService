import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session, Req, ExecutionContext, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { customSerializeDecorator, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { users } from './user.entitty';
import { AuthGuard } from 'src/guards/auth.guard';

// 8961358378 / 9038953212 / 6291581667

@Controller('auth')
// @customSerializeDecorator(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(private userService : UsersService, private authService : AuthService){}
    @Get('/whoami')
    async whoAmI(@Session() session : any, context : ExecutionContext) {
        session.color = 'red'; 
        // if(!session) {
        //     session = {
        //         color : 'red', 
        //     }
        // }
        // const request = context.switchToHttp().getRequest();
        // console.log('request.session');  
        // console.log(request.session); 
        console.log('session'); 
        console.log(session); 
        const user = await this.userService.findUserById(session.userId); 
        return user; 
    }
    @Get('/who')
    @UseGuards(AuthGuard)
    async who(@CurrentUser() user : users) {
        return user; 
    }
    @Get('/color')
    whichColor(@Session() session : any) {
        return session.color; 
    }
    @Get('/logout')
    logOut(@Session() session : any) {
        session.userId = null; 
        console.log(session); 
        return 'Logged Out'; 
    }
    @Post('/signup') 
    async createUsers(@Session() session : any, @Body() body : CreateUserDto) {
        // console.log(body); 
        // return this.userService.createUsers(body.email, body.password); 
        const user = await this.authService.signUp(body.email, body.password); 
        session.userId = user.id; 
        return user; 
    }
    @customSerializeDecorator(UserDto)
    @Post('/signin') 
    async SigIn(@Session() session : any, @Body() body : CreateUserDto) {
        // console.log(body); 
        // return this.userService.createUsers(body.email, body.password); 
        const user = await this.authService.signIn(body.email, body.password); 
        session.userId = user.id; 
        return user; 
    }
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    // @customSerializeDecorator(UserDto)
    @Get('/allUsers')
    @UseGuards(AuthGuard)
    findAllUsers() {
        return this.userService.findAllUsers(); 
    }
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    @customSerializeDecorator(UserDto)
    @Get('/findUserById/:id')
    findUserById(@Param('id') id : string) {
        return this.userService.findUserById(parseInt(id)); 
    }

    @Get('/findUserByEmail')
    findUserByEmail(@Query('email') email : string) {
        return this.userService.findUserByEmail(email); 
    }

    @Delete('/removeUser/:id')
    async removeUser(@Param('id') id : string) {
        console.log(id); 
        return await this.userService.removeUser(parseInt(id))
    }

    @Patch('/updateUser/:id')
    async updateUser(@Param('id') id : string, @Body() body : UpdateUserDto) {
        console.log(id); 
        return await this.userService.updateUser(parseInt(id), body)
    }
}
