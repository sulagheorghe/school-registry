import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TeacherBuilder } from './teacher.builder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [TeacherService, TeacherBuilder]
})
export class TeacherModule {}