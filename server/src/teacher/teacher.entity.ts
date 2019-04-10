import {
    Entity,
    Column, 
    PrimaryGeneratedColumn,
} from 'typeorm';
import { TeacherBuilder } from './teacher.builder';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    protected readonly id: number;

    @Column("varchar", {"length": 255})
    protected firstName: string;
    
    @Column("varchar", {"length": 255})
    protected lastName: string;

    @Column("varchar", {"length": 255})
    protected email: string;

    @Column()
    protected password: string;

    @Column()
    protected role: string;

    @Column()
    protected phoneNumber: number;

    constructor(builder: TeacherBuilder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.password = builder.password;
        this.role = builder.role;
        this.phoneNumber = builder.phoneNumber;
    }
}   