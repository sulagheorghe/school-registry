import pwgen = require('generate-password');
import * as bcrypt from 'bcryptjs';

import CreateTeacherDTO from './dto/createTeacher.dto'
import { Teacher } from './teacher.entity';

export class TeacherBuilder {

    private firstName: string;
    
    private lastName: string;

    private password: string;

    private email: string;

    private role: string;

    private phoneNumber: string;

    
    getBuilderFromDTO(teacherDTO: CreateTeacherDTO) {
            this.firstName = teacherDTO.firstName;
            this.lastName = teacherDTO.lastName;
            this.email = teacherDTO.email;
            this.role = teacherDTO.role;
            this.phoneNumber = teacherDTO.phoneNumber;
            this.password = teacherDTO.password;
            return this;
    }

    hashPassword() {           
        const passwordHash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
        this.password = passwordHash;
        return this;
    }

    build () {
        return new Teacher(
            this.firstName,
            this.lastName,
            this.email,
            this.password,
            this.role,
            this.phoneNumber
        );
    }
}