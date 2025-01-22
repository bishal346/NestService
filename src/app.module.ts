import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './users/user.entitty';
import { report } from './reports/report.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite', 
    database: 'db.sqlite', 
    entities: [users, report], 
    synchronize: true,
  }),
   UsersModule, 
   ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
