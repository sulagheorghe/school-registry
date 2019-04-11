import pwgen = require('generate-password');
import * as bcrypt from 'bcryptjs';

import CreateTeacherDTO from './DTO/createTeacher.dto'
import { Teacher } from './teacher.entity';

export class TeacherBuilder {

    private firstName: string;
    
    private lastName: string;

    private password: string;

    private email: string;

    private role: string;

    private phoneNumber: number;

    
    getBuilderFromDTO(teacherDTO: CreateTeacherDTO) {
            this.firstName = teacherDTO.firstName;
            this.lastName = teacherDTO.lastName;
            this.email = teacherDTO.email;
            this.role = teacherDTO.role;
            this.phoneNumber = teacherDTO.phoneNumber;
            return this;
    }

    generatePassword() {
       const password =  pwgen.generate({
            length: 8,
            numbers: true
        });
        

        bcrypt.hashSync(password, function(error, hash) {
            this.password = hash;
        });

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