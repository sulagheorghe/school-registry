import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { GradeGroup} from './grade-group.entity';

@Entity()
export class Student {
    
    @PrimaryGeneratedColumn()
    protected readonly id: number;

    @Column("varchar", {"length": 255})
    protected firstname: string;

    @Column("varchar", {"length": 255})
    protected lastname: string;
    
    @Column("varchar", {"length": 255})
    protected email: string;

    @ManyToOne(type => GradeGroup, grade => grade.id, {
        nullable: false
    })
    @JoinColumn({"name": "grade_group_id"})
    protected gradeGroup: GradeGroup;

    constructor (firstname: string, lastname: string, email: string, grade: GradeGroup) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.gradeGroup = grade;
    }
}