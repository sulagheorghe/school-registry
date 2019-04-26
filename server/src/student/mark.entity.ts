import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Student } from "./student.entity";
import { Teacher } from "src/teacher/teacher.entity";
import { Subject } from "src/subject/subject.entity";

@Entity()
export class Mark{
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    protected mark: number

    @CreateDateColumn({name: "created_at", nullable: false})
    protected markedOn: Date;

    @UpdateDateColumn({name: "last_updated", nullable: false})
    protected lastModification: Date;

    @ManyToOne(type => Student, {
        nullable: false
    })
    @JoinColumn({"name": "student_id"})
    protected student: Student;

    @ManyToOne(type => Subject, {
        nullable: false
    }) 
    @JoinColumn({"name" : "subject_id"})
    protected subject: Subject;

    @ManyToOne(type => Teacher, {
        nullable: false
    })
    @JoinColumn({"name": "teacher_id"})
    protected teacher: Teacher;

    
}