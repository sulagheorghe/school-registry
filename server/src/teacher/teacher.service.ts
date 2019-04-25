import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository, FindOneOptions } from 'typeorm';
import CreateTeacherDTO from './dto/createTeacher.dto';
import { TeacherBuilder } from './teacher.builder';
import { CryptographerService } from '../auth/cryptographer.service';

@Injectable()
export class TeacherService {
    constructor (
        @InjectRepository(Teacher)
        private readonly teacherRepo: Repository<Teacher>,
        private readonly cryptoService: CryptographerService
        ) {}

    async create(createDTO: CreateTeacherDTO): Promise<Teacher> {
        let teacherBuilder = new TeacherBuilder();
        const hashedPassword = this.cryptoService.getHashForString(createDTO.password);
        const teacher = teacherBuilder.
                getBuilderFromDTO(createDTO).
                addHashPassword(hashedPassword)
                .build();
        return await this.teacherRepo.save(teacher);
    }

    async get(id: number): Promise<Teacher>{
        return await this.teacherRepo.findOne(id);
    }

    async getOne(options: object): Promise<Teacher> {
        return await this.teacherRepo.findOne({where: options});
    }

    async getAll(): Promise<Teacher[]> {
        return await this.teacherRepo.find();
    }

    async updateTeacherFromDTO(teacher: Teacher, teacherDTO: CreateTeacherDTO) {
        teacher.updateFromDto(teacherDTO);
        return await this.teacherRepo.save(teacher);
    }
}
