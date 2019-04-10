import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import CreateTeacherDTO from './DTO/createTeacher.dto';

@Controller('teachers')
export class TeacherController {

    @Post()
    async create(@Body() createTeacherDTO: CreateTeacherDTO) {
        console.log(createTeacherDTO);
        
    }
    
    
}
