import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { GradeGroupController } from './grade-group.controller';
import { GradeGroupService } from './grade-group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeGroup } from './grade-group.entity';
import { Student } from './student.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GradeGroup, 
      Student
    ]),
    PassportModule,
    
  ],
  providers: [
    StudentService,
    GradeGroupService
  ],
  controllers: [
    StudentController,
    GradeGroupController
  ]
})
export class StudentModule {}
