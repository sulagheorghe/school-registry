import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';
import CreateTeacherDTO from './DTO/createTeacher.dto';
import { TeacherBuilder } from './teacher.builder';

@Injectable()
export class TeacherService {
    constructor (
        @InjectRepository(Teacher)
        private readonly teacherRepo: Repository<Teacher>,
        ) {}

    async create(createDTO: CreateTeacherDTO): Promise<Teacher> {
        let teacherBuilder = new TeacherBuilder();
        const teacher = teacherBuilder.
                getBuilderFromDTO(createDTO).
                generatePassword()
                .build();
        return await this.teacherRepo.save(teacher);
    }
}
