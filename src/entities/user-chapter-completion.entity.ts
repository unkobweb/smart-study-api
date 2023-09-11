import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { CourseChapter } from "./course-chapter.entity";

@Entity()
export class UserChapterCompletion {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => User, user => user.userChapterCompletions)
  user: User;

  @ManyToOne(type => CourseChapter, courseChapter => courseChapter.userChapterCompletions)
  courseChapter: CourseChapter;
}