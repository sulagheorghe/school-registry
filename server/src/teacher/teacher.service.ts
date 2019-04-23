import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';
import CreateTeacherDTO from './dto/createTeacher.dto';
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
                hashPassword()
                .build();
        return await this.teacherRepo.save(teacher);
    }

    async get(id: number): Promise<Teacher>{
        return await this.teacherRepo.findOne(id);
    }

    async getAll(): Promise<Teacher[]> {
        return await this.teacherRepo.find();
    }

    async updateTeacherFromDTO(teacher: Teacher, teacherDTO: CreateTeacherDTO) {
        teacher.updateFromDto(teacherDTO);
        return await this.teacherRepo.save(teacher);
    }
}
