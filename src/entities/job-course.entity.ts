import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity()
export class JobCourse {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => Job, job => job.jobCourses)
  job: Job;

}