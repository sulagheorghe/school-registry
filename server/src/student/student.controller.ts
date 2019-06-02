import { Controller, Post, Body, Get, Param, NotFoundException, Put, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDTO } from './dto/create-student.dto';
import { Student } from './student.entity';
import { AuthGuard } from '@nestjs/passport';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('/students')
@UseGuards(AuthGuard('jwt'))
export class StudentController {
    constructor(private readonly studentService: StudentService) {

    }

    @Post()
    async create(@Body() createStudentDTO: CreateStudentDTO) {
        return this.studentService.createFromDTO(createStudentDTO);
    }
    
    @Get(':id')
    async get(@Param('id') id: number) {
        const student = await this.studentService.getById(id, true);
        if (!student) {
            throw new NotFoundException();
        }
        return student;
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() createStudentDTO: CreateStudentDTO) {
        const student = await this.studentService.getById(id);
        if (!student) {
            throw new NotFoundException();
        }
        return await this.studentService.update(student, createStudentDTO);
    }

    @Get()
    async getAll(): Promise<Student[]> {
        return await this.studentService.getAll();
    }
}
