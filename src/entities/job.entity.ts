import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AverageJobSalary } from "./average-job-salary.entity";
import { JobOffer } from "./job-offer.entity";
import { JobCourse } from "./job-course.entity";

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @OneToMany(() => AverageJobSalary, averageJobSalary => averageJobSalary.job)
  averageSalaries: AverageJobSalary[];

  @OneToMany(() => JobOffer, jobOffer => jobOffer.job)
  offers: JobOffer[];

  @OneToMany(() => JobCourse, jobCourse => jobCourse.job)
  jobCourses: JobCourse[];
}