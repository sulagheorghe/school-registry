import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TeacherBuilder } from './teacher.builder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import {  IsTeacherExistConstraint } from '../common/decorators/IsTeacherExist';
import { SubjectController } from '../subject/subject.controller';
import { SubjectService } from '../subject/subject.service';
import { Subject } from '../subject/subject.entity';
import { TeacherSubject } from 'src/teacher/teacher-subject/teacher-subject.entity';
import { TeacherSubjectController } from './teacher-subject/teacher-subject.controller';
import { TeacherSubjectService } from './teacher-subject/teacher-subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Subject, TeacherSubject])],
  controllers: [TeacherController, SubjectController, TeacherSubjectController, ],
  providers: [TeacherService, TeacherBuilder, IsTeacherExistConstraint, SubjectService, TeacherSubjectService],
})
export class TeacherModule {}