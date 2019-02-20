import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Subject {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar", {"length": 255})
    name:string;
}