import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn ,UpdateDateColumn } from "typeorm";

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
  user_uuid?: string;

  @Column({ nullable: true })
  price?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}