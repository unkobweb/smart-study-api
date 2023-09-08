import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn ,UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { CoursePart } from "./course-part.entity";
import { Media } from "./media.entity";
import { CourseJob } from "./course-job.entity";

@Entity()
export class Course {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false, default: 'Sans titre' })
  title?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  price?: number;

  @Column({ default: false })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(type => User, user => user.courses)
  user: User;

  @OneToMany(type => CoursePart, courseParts => courseParts.course)
  courseParts: CoursePart[];

  @JoinColumn()
  @OneToOne(type => Media, media => media.course)
  thumbnail: Media;

  @JoinColumn()
  @OneToOne(type => Media, media => media.courseVideo)
  video: Media;

  @OneToMany(type => CourseJob, courseJob => courseJob.course)
  courseJobs: CourseJob[];
}