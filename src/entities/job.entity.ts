import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseJob } from "./course-job.entity";

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => CourseJob, courseJob => courseJob.job)
  jobCourses: CourseJob[];
}