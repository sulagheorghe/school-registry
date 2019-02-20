import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { TeacherModule } from './teacher/teacher.module';
import { PupilModule } from './pupil/pupil.module';
import { from } from 'rxjs';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TeacherModule, PupilModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
