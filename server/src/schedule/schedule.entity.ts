import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Subject } from "../subject/subject.entity";
import { Teacher } from "../teacher/teacher.entity";
import { GradeGroup } from "src/student/grade-group.entity";

@Entity()
export class Schedule{
    @PrimaryGeneratedColumn()
    readonly id: number;

    //monday, tuesday,...,friday
    @Column("varchar", {"length": 20})
    dayOfWeek: string;

    @ManyToOne( type => Subject, {
        nullable: false
    })
    @JoinColumn({"name": "subject_id"})
    subject: Subject;

    @ManyToOne(type => Teacher, {
        nullable: false
    })
    @JoinColumn({"name": "teacher_id"})
    teacher: Teacher;

    @ManyToOne(type => GradeGroup, {
        nullable: false
    }) 
    @JoinColumn({"name": "grade_group_id"})
    gradeGroup: GradeGroup;

    constructor(dayOfWeek: string, subject: Subject, teacher: Teacher, gradeGroup: GradeGroup) {
        this.dayOfWeek = dayOfWeek;
        this.subject = subject;
        this.teacher = teacher;
        this.gradeGroup = gradeGroup;
    }

}