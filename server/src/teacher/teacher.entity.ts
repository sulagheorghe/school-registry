import {
    Entity,
    Column, 
    PrimaryGeneratedColumn,
} from 'typeorm';
import { TeacherBuilder } from './teacher.builder';
import CreateTeacherDTO from './DTO/createTeacher.dto';

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

    @Column({
        type: "varchar",
        length: 9,
        default: ""
    })
    protected phoneNumber: string;

    constructor(firstName: string, lastName: string, email: string, password: string, role: string, phoneNumber: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.phoneNumber = phoneNumber;
    }

    updateFromDto(teacherDTO: CreateTeacherDTO) {
        this.firstName = teacherDTO.firstName;
        this.lastName = teacherDTO.lastName;
        this.email = teacherDTO.email;
        this.phoneNumber = teacherDTO.phoneNumber;
        this.role = teacherDTO.role;
    }
}   