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
    const qb = this.jobSalaryRepository.createQueryBuilder('jobSalary')
      .select('DATE_TRUNC(\'month\', jobSalary.date)', 'month')
      .addSelect('SUM(jobSalary.nbOffers)', 'totalOffers')
      .addSelect('AVG(jobSalary.avgSalary)', 'averageSalary')
      .addSelect('jobSalary.jobUuid', 'jobUuid')
      .innerJoin('jobSalary.job', 'job')
      .where('job.uuid = :uuid', { uuid: uuid })
      .groupBy('DATE_TRUNC(\'month\', jobSalary.date), jobSalary.jobUuid')
      .orderBy('jobSalary.jobUuid, month')
      .limit(12);

    // Obtenez la date du mois précédent
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);

    // Récupérez l'année et le mois
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');

    // Formatez l'année et le mois au format 'YYYY-MM'
    const formattedDate = `${year}-${month}`;

    console.log(formattedDate);

    const donut = this.jobSalaryRepository.createQueryBuilder('jobSalary')
      .select('SUM(jobSalary.nbOffers)', 'totalOffers')
      .where(`DATE_TRUNC('month', jobSalary.date) = :month`, { month: `${formattedDate}-01` });

    const lastMonthData = await qb.getRawMany()
    const donnutData = await donut.getRawOne()
    
    return [lastMonthData, donnutData];
  }
}
