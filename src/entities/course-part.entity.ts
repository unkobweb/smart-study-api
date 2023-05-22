import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn ,UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Course } from "./course.entity";

@Entity()
export class CoursePart {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false })
  title?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(type => Course, course => course.courseParts)
  course: Course;
}