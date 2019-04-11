import {Column, PrimaryGeneratedColumn, Entity} from 'typeorm';

@Entity()
export class GradeGroup{
    
    @PrimaryGeneratedColumn()
    protected id:number;

    @Column("smallint")
    protected addmisionYear: number;

    @Column({
        type: "varchar",
        length: 1
    })
    protected group: string;
}