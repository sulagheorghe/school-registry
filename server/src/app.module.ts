import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TeacherModule, StudentModule, AuthModule, ScheduleModule
  ],
  providers: [],
})
export class AppModule {}
