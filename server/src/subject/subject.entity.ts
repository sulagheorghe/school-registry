import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ISubject } from "../../../common/interfaces/subject.interface";

@Entity()
export class Subject implements ISubject{
    
    @PrimaryGeneratedColumn()
    readonly id?: number;

    @Column("varchar", {"length": 255})
    name:string;

    constructor(name: string) {
        this.name = name;
    }

    getName(){
       return this.name;
    }

    setName(name: string) {
        this.name = name;
    } 

    
}