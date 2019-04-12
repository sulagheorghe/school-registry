import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { from } from 'rxjs';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TeacherModule, StudentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
