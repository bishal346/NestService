import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from './user.entitty';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(users) private repo : Repository<users>){}
    async createUsers(email: string, password: string) {
        const user = await this.repo.create({email, password}); 
        return await this.repo.save(user); 
    }
    async findAllUsers() {
        return await this.repo.find(); 
    }
    async findUserById(id : number) {
        if(!id) {
            return null; 
        }
        console.log("Find User by Id "+id)
        return await this.repo.findOne({ where: { id } }); 
    }
    async findUserByEmail(email : string) {
        return await this.repo.find({ where: { email : email } }); 
    }
    async removeUser(id: number) {
        const user = await this.findUserById(id); 
        if(!user) {
            throw Error("WSER NOT FOUND")
        }
        console.log(user); 
        return await this.repo.remove(user); 
    }
    async updateUser(id: number, body: Partial<users>) {
        const user = await this.findUserById(id); 
        if(!user) {
            throw Error("WSER NOT FOUND")
        }
        console.log(user); 
        Object.assign(user,body)
        return await this.repo.save(user); 
    }
}
