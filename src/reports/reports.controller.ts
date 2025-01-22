import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { users } from 'src/users/user.entitty';
import { customSerializeDecorator } from 'src/interceptors/serialize.interceptor';
import { DisplayReportDto } from './dto/display-report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { FindByQueryReport } from './dto/findByQuery-report.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportService : ReportsService){}
    @Post('/createReort')
    @UseGuards(AuthGuard)
    @customSerializeDecorator(DisplayReportDto)
    async createReport(@Body() body : CreateReportDto, @CurrentUser() user : users) {
        console.log(body); 
        console.log(user); 
        return this.reportService.create(body, user)
    }
    @Get('/findAll') 
    async findAll() {
        return this.reportService.findAll(); 
    }
    @Patch('/approve/:id')
    @UseGuards(AdminGuard)
    async approve(@Param('id') id : string, @Body() body : ApproveReportDto) {
        console.log(id);
        console.log(body) 
        return await this.reportService.approveReport(parseInt(id), body)
    }
    @Get('/findByQuery') 
    async findByQuery(@Query() body : FindByQueryReport) {
        console.log(body); 
        return await this.reportService.findByQuery(body); 
    }
}
