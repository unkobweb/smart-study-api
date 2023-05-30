import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

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
}