import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { CourseChapter } from "./course-chapter.entity";
import { Course } from "./course.entity";

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({unique: true})
  key: string;

  @Column()
  name: string;

  @Column()
  size: number;

  @Column({ nullable: true })
  url?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({nullable: true})
  deletedAt?: Date;

  @OneToOne(type => User, user => user.profilePicture)
  user: User;

  @ManyToOne(type => CourseChapter, courseChapter => courseChapter.documents)
  courseChapter: CourseChapter;

  @OneToOne(type => Course, course => course.thumbnail)
  course: Course;

  @OneToOne(type => CourseChapter, courseChapter => courseChapter.video)
  courseChapterVideo: CourseChapter;

  @OneToOne(type => Course, course => course.video)
  courseVideo: Course;
}