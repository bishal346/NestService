import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { report } from './report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { users } from 'src/users/user.entitty';
import { ApproveReportDto } from './dto/approve-report.dto';
import { FindByQueryReport } from './dto/findByQuery-report.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(report) private repo : Repository<report>){}

    async create(reportDto : CreateReportDto, user : users) {
        const report = await this.repo.create(reportDto); 
        report.user = user;
        return await this.repo.save(report); 
    }

    async findAll() {
        return await this.repo.find(); 
    }

    async findUserById(id : number) {
        if(!id) {
            return null; 
        }
        console.log("Find User by Id "+id)
        return await this.repo.findOne({ where: { id } }); 
    }

    async approveReport(id : number, body : ApproveReportDto) {
        const report = await this.findUserById(id); 
        report.approved = body.approve; 
        return await this.repo.save(report); 
    }

    async findByQuery({make, model, lat, long, year, milage} : FindByQueryReport) {
        console.log(make); 
        return await this.repo
        .createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('make = :make', { make })
        .andWhere('model = :model', { model })
        .andWhere('long - :long BETWEEN -5 AND 5', { long })
        .andWhere('lat = :lat BETWEEN -5 AND 5', { lat })
        .andWhere('year = :year BETWEEN -3 AND 3', { year })
        .orderBy('ABS(milage - :milage)', 'DESC')
        .setParameters({milage})
        .limit(3)
        .getRawMany(); 
    }
}
