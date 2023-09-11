import { Injectable } from '@nestjs/common';
import { JobSalary } from 'src/entities/job-salary.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobSalariesService {


  constructor(
    @InjectRepository(JobSalary) private jobSalaryRepository: Repository<JobSalary>,
  ) { }


  findAll(opts?: FindManyOptions) {
    return this.jobSalaryRepository.find(opts);
  }

  async findOne(uuid: string) {
    const job = await this.jobSalaryRepository.findOne({
      where: { uuid: uuid },
    })

    return job;
  }
}
