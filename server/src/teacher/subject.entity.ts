import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Subject {
    
    @PrimaryGeneratedColumn()
    protected readonly id:number;

    @Column("varchar", {"length": 255})
    protected name:string;
}