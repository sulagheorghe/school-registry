import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { GradeGroup} from './grade-group.entity';

@Entity()
export class Student {
    
    @PrimaryGeneratedColumn()
    protected readonly id: number;

    @Column("varchar", {"length": 255})
    protected firstName: string;

    @Column("varchar", {"length": 255})
    protected lastName: string;
    
    @Column("varchar", {"length": 255})
    protected email: string;

    @Column("date")
    protected dateOfBirth: string;

    @ManyToOne(type => GradeGroup, {
        nullable: false
    })
    @JoinColumn({"name": "grade_group_id"})
    protected gradeGroup: GradeGroup;
}