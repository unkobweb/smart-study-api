import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  email: string;

  @Column({nullable: true})
  password?: string;

  @Column({nullable: true})
  firstName?: string;

  @Column({nullable: true})
  lastName?: string;

  @Column({nullable: true})
  dateOfBirth?: Date;

  @Column({nullable: true})
  city?: string;

  // TODO : add profile picture
}