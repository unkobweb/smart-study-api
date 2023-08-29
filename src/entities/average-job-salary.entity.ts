import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity()
export class AverageJobSalary {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  date: Date;

  @Column()
  avgSalary: number;

  @ManyToOne(() => Job, job => job.averageSalaries)
  job: Job;
}