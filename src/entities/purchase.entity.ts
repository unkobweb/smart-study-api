import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Course } from "./course.entity";

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  amount: number;

  @Column()
  checkoutSessionId: string;

  @Column({default: false})
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => User, user => user.purchases)
  user: User;

  @ManyToOne(type => Course, course => course.purchases)
  course: Course;
}