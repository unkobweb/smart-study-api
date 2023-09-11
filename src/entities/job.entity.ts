import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobSalary } from "./job-salary.entity";
import { JobOffer } from "./job-offer.entity";
import { JobCourse } from "./job-course.entity";

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => JobSalary, jobSalary => jobSalary.job)
  averageSalaries: JobSalary[];

  @OneToMany(() => JobOffer, jobOffer => jobOffer.job)
  offers: JobOffer[];

  @OneToMany(() => JobCourse, jobCourse => jobCourse.job)
  jobCourses: JobCourse[];
}