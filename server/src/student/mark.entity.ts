import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Student } from "./student.entity";
import { Teacher } from "src/teacher/teacher.entity";
import { Subject } from "src/subject/subject.entity";

@Entity({
    name: 'marks'
})
export class Mark {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    mark: number;

    @Column({name: "is_present"})
    isPresent: boolean;

    @Column({ name: "planed_at", type: "date", nullable: false })
    planedOn: Date;

    @CreateDateColumn({ name: "created_at", nullable: false })
    protected markedOn: Date;

    @UpdateDateColumn({ name: "last_updated", nullable: false })
    protected lastModification: Date;

    @ManyToOne(type => Student, {
        nullable: false
    })
    @JoinColumn({ "name": "student_id" })
    student: Student;

    @ManyToOne(type => Subject, {
        nullable: false
    })
    @JoinColumn({ "name": "subject_id" })
    subject: Subject;

    @ManyToOne(() => Teacher, {
        nullable: false
    })
    @JoinColumn({ "name": "teacher_id" })
    teacher: Teacher;

    constructor(mark: number, planedOn: Date, student: Student, subject: Subject, teacher: Teacher, isPresent: boolean) {
        this.mark = mark;
        this.planedOn = planedOn;
        this.student = student;
        this.subject = subject;
        this.teacher = teacher;
        this.isPresent = isPresent;
    }
}
