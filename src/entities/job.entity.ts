import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobSalary } from "./job-salary.entity";
import { CourseJob } from "./course-job.entity";

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

  @OneToMany(() => CourseJob, CourseJob => CourseJob.job)
  CourseJobs: CourseJob[];
}