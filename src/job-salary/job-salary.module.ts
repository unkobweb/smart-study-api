import { Module } from '@nestjs/common';
import { JobSalaryService } from './job-salary.service';
import { JobSalaryController } from './job-salary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSalary } from '../entities/job-salary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobSalary])],
  controllers: [JobSalaryController],
  providers: [JobSalaryService]
})
export class JobSalaryModule {}
