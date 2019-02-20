import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { GradeGroup} from './grade-group.entity';

@Entity()
export class Pupil {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {"length": 255})
    firstName: string;

    @Column("varchar", {"length": 255})
    lastName: string;
    
    @Column("varchar", {"length": 255})
    email: string;

    @Column("date")
    dateOfBirth: string;

    @ManyToOne(type => GradeGroup)
    gradeGroup: GradeGroup;
}