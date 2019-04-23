import { Controller, Get, Req, Post, Body, Res, Param, NotFoundException, Put, UsePipes, ValidationPipe, UseInterceptors } from '@nestjs/common';
import CreateTeacherDTO from './dto/createTeacher.dto';
import { TeacherService } from './teacher.service';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { TeacherSubject } from 'src/teacher/teacher-subject/teacher-subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('teachers')
@UseInterceptors(TransformInterceptor)
export class TeacherController {
    constructor(private teacherService: TeacherService, 
      @InjectRepository(TeacherSubject) private readonly teacherSubRep: Repository<TeacherSubject>){}

    @Post()
    @UsePipes(new ValidationPipe({
        validationError: {
          target: false,
        }, 
        whitelist:true,
        groups: ["create"]        
      }))
    async create(@Body() createTeacherDTO: CreateTeacherDTO) {
        let teacher = this.teacherService.create(createTeacherDTO);
        return teacher;
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const teacher = await this.teacherService.get(id);
        if (!teacher) {
            throw new NotFoundException();
        }
        return teacher;
    }

    @Get() 
    async getAll() {
      return this.teacherService.getAll()
    }

    @Put(':id') 
    @UsePipes(new ValidationPipe({
        validationError: {
          target: false,
        }, 
        whitelist:true,
        groups: ["update"]        
      }))
    async editInfo(
      @Param('id') id: number,
      @Body() createTeacherDTO: CreateTeacherDTO) {
        const teacher = await this.teacherService.get(id);
        if (!teacher) {
            throw new NotFoundException();
        }
        return this.teacherService.updateTeacherFromDTO(teacher, createTeacherDTO);
    } 
        
}
