import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Subject } from "./subject.entity";
import { Teacher } from "./teacher.entity";
import { GradeGroup } from "src/student/grade-group.entity";

@Entity()
export class Schedule{
    @PrimaryGeneratedColumn()
    protected readonly id: number;

    @Column()
    protected subjectOrder: number;

    @Column("varchar", {"length": 20})
    protected dayOfWeek: string;

    @ManyToOne( type => Subject, {
        nullable: false
    })
    @JoinColumn({"name": "subject_id"})
    protected subject: Subject;

    @ManyToOne(type => Teacher, {
        nullable: false
    })
    @JoinColumn({"name": "teacher_id"})
    protected teacher: Teacher;

    @ManyToOne(type => GradeGroup, {
        nullable: false
    }) 
    @JoinColumn({"name": "grade_group_id"})
    protected gradeGroup: GradeGroup;

}