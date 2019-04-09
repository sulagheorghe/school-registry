import { PrimaryGeneratedColumn, ManyToOne, JoinColumn, Entity } from "typeorm";
import { Teacher } from "./teacher.entity";
import { Subject } from "./subject.entity";

@Entity()
export class TeacherSubject {
    @PrimaryGeneratedColumn()
    protected readonly id:number;

    @ManyToOne(type => Teacher, {
        nullable: false
    })
    @JoinColumn({"name": "teacher_id"})
    protected teacher: Teacher;

    @ManyToOne(type => Subject, {
        nullable: false
    })
    @JoinColumn({"name" : "subject_id"})
    protected subject: Subject;    
}