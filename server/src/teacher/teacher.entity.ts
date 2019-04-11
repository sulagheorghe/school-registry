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

    constructor(firstName: string, lastName: string, email: string, password: string, role: string, phoneNumber: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.phoneNumber = phoneNumber;
    }
}   