import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from 'src/teacher/teacher.entity';

@Entity()
export class GradeGroup {

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column("smallint")
    protected addmisionYear: number;

    @Column({
        type: "varchar",
        length: 1
    })
    protected group: string;

    @ManyToOne(type => Teacher, classMaster => classMaster.id, {
        nullable: false
    })
    @JoinColumn({ "name": "teacher_id" })
    protected classMaster: Teacher;

    constructor(addmisionYear: number, group: string, classMaster: Teacher){
        this.addmisionYear = addmisionYear;
        this.group = group;
        this.classMaster = classMaster;
    }
}