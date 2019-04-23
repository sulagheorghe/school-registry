import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TeacherBuilder } from './teacher.builder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import {  IsTeacherExistConstraint } from './validator/decorator/IsTeacherExist';
import { SubjectController } from './subject/subject.controller';
import { SubjectService } from './subject/subject.service';
import { Subject } from './subject/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Subject])],
  controllers: [TeacherController, SubjectController],
  providers: [TeacherService, TeacherBuilder, IsTeacherExistConstraint, SubjectService],
})
export class TeacherModule {}