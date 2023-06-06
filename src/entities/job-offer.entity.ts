import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity()
export class JobOffer {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column()
  salary: number;

  @ManyToOne(() => Job, job => job.offers)
  job: Job;
}