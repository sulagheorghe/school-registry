import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { GradeGroupController } from './grade-group.controller';
import { GradeGroupService } from './grade-group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeGroup } from './grade-group.entity';
import { Student } from './student.entity';
import { PassportModule } from '@nestjs/passport';
import { Mark } from './mark.entity';
import { MarkService } from './mark.service';
import { MarksController } from './marks.controller';
import { TeacherModule } from 'src/teacher/teacher.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GradeGroup, 
      Student,
      Mark
    ]),
    PassportModule,
    TeacherModule        
  ],
  providers: [
    StudentService,
    GradeGroupService,
    MarkService
  ],
  controllers: [
    MarksController,
    StudentController,
    GradeGroupController,
  ],
  exports: [
    GradeGroupService
  ]
})
export class StudentModule {}
