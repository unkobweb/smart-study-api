import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Course } from "./course.entity";
import { Job } from "./job.entity";

@Unique(['course', 'job'])
@Entity()
export class CourseJob {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(type => Course, course => course.courseJobs)
  course: Course;

  @ManyToOne(type => Job, job => job.jobCourses)
  job: Job;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}