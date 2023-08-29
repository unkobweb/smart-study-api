import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CoursePart } from "./course-part.entity";

@Entity()
export class CourseChapter {
    
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    title?: string;

    @Column({ type: 'simple-json', default: {} })
    description: object;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(type => CoursePart, coursePart => coursePart.courseChapters)
    coursePart: CoursePart;
}
