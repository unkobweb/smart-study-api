import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CoursePart } from "./course-part.entity";
import { Media } from "./media.entity";

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

    @OneToMany(type => Media, media => media.courseChapter)
    documents: Media[];

    @JoinColumn()
    @OneToOne(type => Media, media => media.courseChapterVideo)
    video: Media;
}
