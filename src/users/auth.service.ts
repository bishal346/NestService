import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { users } from './user.entitty';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt); 

@Injectable()
export class AuthService {
    constructor( private userService : UsersService){}
    async signUp(email : string, password : string) {
        const user = await this.userService.findUserByEmail(email); 
        if(user.length) {
            throw new BadRequestException("email already in use"); 
        }
        const salt = randomBytes(8).toString('hex')
        const hash = await scrypt(password, salt, 32) as Buffer; 
        const result = salt + '.' + hash.toString('hex'); 
        return await this.userService.createUsers(email, result); 
    }
    async signIn(email : string, password : string) {
        const [user] = await this.userService.findUserByEmail(email); 
        if(!user) {
            throw new NotFoundException('Email ID Does not match')
        }
        const [salt, pass] = user.password.split('.')
        const hash = await scrypt(password, salt, 32) as Buffer; 
        if(hash.toString('hex') === pass) {
            return user
        }
        throw new BadRequestException('Wrong password')
    }
}
