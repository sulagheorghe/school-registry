import { Controller, Get, Req, Post, Body, Res, Param, NotFoundException, Put } from '@nestjs/common';
import CreateTeacherDTO from './DTO/createTeacher.dto';
import { TeacherService } from './teacher.service';

@Controller('teachers')
export class TeacherController {
    constructor(private teacherService: TeacherService){}

    @Post()
    async create(@Body() createTeacherDTO: CreateTeacherDTO) {
        let teacher = this.teacherService.create(createTeacherDTO);
        teacher.then(teacher => console.log(teacher));
        teacher.catch(error => console.log(error));
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const teacher = await this.teacherService.get(id);
        if (!teacher) {
            throw new NotFoundException();
        }
        return teacher;
    }

    @Put(':id') 
    async editInfo(@Param('id') id: number, @Body() createTeacherDTO: CreateTeacherDTO) {
        const teacher = await this.teacherService.get(id);
        if (!teacher) {
            throw new NotFoundException();
        }
        return this.teacherService.updateTeacherFromDTO(teacher, createTeacherDTO);


    }
    
    
}
