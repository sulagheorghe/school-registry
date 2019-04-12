import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TeacherBuilder } from './teacher.builder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import {  IsTeacherExistConstraint } from './validator/decorator/IsTeacherExist';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [TeacherService, TeacherBuilder, IsTeacherExistConstraint],
})
export class TeacherModule {}