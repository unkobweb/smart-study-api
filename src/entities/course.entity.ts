import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn ,UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { CoursePart } from "./course-part.entity";

@Entity()
export class Course {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: false, default: 'Sans titre' })
  title?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column({ nullable: true })
  tags?: number;

  @Column({ nullable: true })
  price?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(type => User, user => user.courses)
  user: User;

  @OneToMany(type => CoursePart, courseParts => courseParts.course)
  courseParts: CoursePart[];
}