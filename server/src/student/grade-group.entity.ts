import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from 'src/teacher/teacher.entity';
import { GradeGroupInterface } from '../../../common/interfaces/grade-group.interface';

@Entity()
export class GradeGroup implements GradeGroupInterface {

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column("smallint")
    admissionYear: number;

    @Column({
        type: "varchar",
        length: 1
    })
    group: string;

    @ManyToOne(type => Teacher, classMaster => classMaster.id, {
        nullable: false
    })
    @JoinColumn({ "name": "teacher_id" })
    classMaster: Teacher;

    constructor(admissionYear: number, group: string, classMaster: Teacher){
        this.admissionYear = admissionYear;
        this.group = group;
        this.classMaster = classMaster;
    }
}