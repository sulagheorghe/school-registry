import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import CreateTeacherDTO from './dto/createTeacher.dto';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column("varchar", { "length": 255 })
    firstName: string;

    @Column("varchar", { "length": 255 })
    lastName: string;

    @Column("varchar", { "length": 255 })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    role: string;

    @Column({
        type: "varchar",
        length: 9,
        default: ""
    })
    phoneNumber: string;

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