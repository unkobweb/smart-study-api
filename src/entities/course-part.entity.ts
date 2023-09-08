import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn ,UpdateDateColumn } from "typeorm";
import { Course } from "./course.entity";
import { CourseChapter } from "./course-chapter.entity";

@Entity()
export class CoursePart {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false })
  title?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(type => Course, course => course.courseParts)
  course: Course;

  @OneToMany(type => CourseChapter, courseChapters => courseChapters.coursePart)
  courseChapters: CourseChapter[];
}