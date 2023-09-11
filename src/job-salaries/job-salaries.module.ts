import { Module } from '@nestjs/common';
import { JobSalariesService } from './job-salaries.service';
import { JobSalariesController } from './job-salaries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSalary } from 'src/entities/job-salary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobSalary])],
  controllers: [JobSalariesController],
  providers: [JobSalariesService]
})
export class JobSalariesModule {}
