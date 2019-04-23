import { PrimaryGeneratedColumn, ManyToOne, JoinColumn, Entity } from "typeorm";
import { Teacher } from "../teacher.entity";
import { Subject } from "../../subject/subject.entity";

@Entity()
export class TeacherSubject {
    @PrimaryGeneratedColumn()
    readonly id:number;

    @ManyToOne(type => Teacher, teacher => teacher.id, {
        nullable: false
    })
    @JoinColumn({"name": "teacher_id"})
    teacher: Teacher

    @ManyToOne(type => Subject, {
        nullable: false
    })
    @JoinColumn({"name" : "subject_id"})
    subject:Subject    
    
}