import { Controller, Post, Body, Put, Param, NotFoundException, HttpCode, Get, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { TeacherSubjectService } from './teacher-subject.service';
import { TeacherSubject } from './teacher-subject.entity';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { TeacherService } from '../teacher.service';
import { SubjectService } from 'src/subject/subject.service';

@UseInterceptors(TransformInterceptor)
@Controller('teacher-subject')
export class TeacherSubjectController {
    constructor(
        private readonly teacherSubjService: TeacherSubjectService,
        private readonly teacherService: TeacherService,
        private readonly subjectService: SubjectService
        ) {}

    @Post()
    async createLink(@Body()teacherSubject: TeacherSubject) {
        return await this.teacherSubjService.save(teacherSubject);
    }

    @HttpCode(204)
    @Put(':id')
    async update(@Param('id') id: number, @Body()teacherSubject: TeacherSubject) {
        const existingTeacherSubject = await this.teacherSubjService.get(id);
        if (!existingTeacherSubject) {
            throw new NotFoundException()
        }
        existingTeacherSubject.subject = teacherSubject.subject;
        existingTeacherSubject.teacher = teacherSubject.teacher;
        this.teacherSubjService.save(existingTeacherSubject);
    }

    @Get()
    async getAll() {
        return this.teacherSubjService.getAll();
    }
    
}
