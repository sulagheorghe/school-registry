import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherSubject } from './teacher-subject.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherSubjectService {
    constructor(
        @InjectRepository(TeacherSubject)
        private readonly teacherSubjRepo: Repository<TeacherSubject>,
        ){    }
    
    async save(teacherSubj: TeacherSubject): Promise<TeacherSubject> {
       return await this.teacherSubjRepo.save(teacherSubj);
    }

    async get(id:number): Promise<TeacherSubject> {
        return await this.teacherSubjRepo.findOne(id, {relations: ['subject','teacher']});
    }

    async getAll(): Promise<TeacherSubject[]> {
        return await this.teacherSubjRepo.find({relations: ['subject','teacher']});
    }
}
