import pwgen = require('generate-password');
import * as bcrypt from 'bcryptjs';

import CreateTeacherDTO from './DTO/createTeacher.dto'
import { Teacher } from './teacher.entity';

export class TeacherBuilder {

    firstName: string;
    
    lastName: string;

    password: string;

    email: string;

    role: string;

    phoneNumber: number;

    constructor (firstName: string, lastName: string, email: string, role: string, phoneNumber: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.phoneNumber = phoneNumber;
    }

    getBuilderFromDTO(teacherDTO: CreateTeacherDTO) {
        return new TeacherBuilder(
            teacherDTO.firstName,
            teacherDTO.lastName,
            teacherDTO.email,
            teacherDTO.role,
            teacherDTO.phoneNumber); 
    }

    generatePassword() {
        const password = pwgen.generate({
            length: 8,
            numbers: true
        });

        bcrypt.hash(password, function(error, hash) {
            this.password = hash;
        });

        return this;
    }

    build () {
        return new Teacher(this);
    }
}