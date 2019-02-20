import {Column, PrimaryGeneratedColumn, Entity} from 'typeorm';

@Entity()
export class GradeGroup{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column("smallint")
    addmisionYear: number;

    @Column("varchar", {"length": 1})
    group: string;
}