import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Media } from "./media.entity";

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
  
  @Column({nullable: true})
  secret2Fa?: string;

  @Column({nullable: false, default: false})
  enabled2Fa: boolean;
  // TODO : add profile picture

  @OneToOne(type => Media, media => media.user)
  profilePicture: Media;
}