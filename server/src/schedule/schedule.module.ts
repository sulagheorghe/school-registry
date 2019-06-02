import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { StudentModule } from 'src/student/student.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { SubjectService } from 'src/subject/subject.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule]),
    StudentModule,
    TeacherModule
  ],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule {}
