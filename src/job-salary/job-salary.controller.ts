import { Controller, Get, Param, Req } from '@nestjs/common';
import { JobSalaryService } from './job-salary.service';

@Controller('job-salaries')
export class JobSalaryController {
  constructor(private readonly JobSalaryService: JobSalaryService) {}


  // @Get()
  // findAll() {
  //   return this.JobSalaryService.findAll();
  // }

  @Get('job')
  findAll(@Req() req) {
    return this.JobSalaryService.findAll({
      where: {
        job: { uuid: req.job.uuid }
      },
      relations: ['job']
    });
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.JobSalaryService.findOne(uuid);
  }

}
