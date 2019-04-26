import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { GradeGroupController } from './grade-group.controller';

@Module({
  providers: [StudentService],
  controllers: [StudentController, GradeGroupController]
})
export class StudentModule {}
