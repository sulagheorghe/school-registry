import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Student } from "./student.entity";
import { Teacher } from "src/teacher/teacher.entity";
import { Subject } from "src/teacher/subject/subject.entity";

@Entity()
export class Mark{
    @PrimaryGeneratedColumn()
    protected readonly id: number;

    @Column()
    protected mark: number

    @Column("datetime")
    protected markedOn: Date;

    @Column("datetime")
    protected lastModification:Date;

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