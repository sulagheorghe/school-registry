import { Controller, Get, Req, Post, Body, Res } from '@nestjs/common';
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
    
    
}
