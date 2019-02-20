import { PrimaryGeneratedColumn, ManyToOne, JoinColumn, Entity } from "typeorm";
import { Teacher } from "./teacher.entity";
import { Subject } from "./subject.entity";

@Entity()
export class TeacherSubject {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(type => Teacher)
    @JoinColumn({"name": "teacher_id"})
    teacher: Teacher;

    @ManyToOne(type => Subject)
    @JoinColumn({"name" : "subject_id"})
    subject: Subject;    
}