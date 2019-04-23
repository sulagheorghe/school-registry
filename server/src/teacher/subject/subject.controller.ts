import { Controller, Post, Body, Get, Put, Param, UsePipes, ValidationPipe, NotFoundException } from "@nestjs/common";
import { CreateSubjectDTO } from "../DTO/createSubject.dto";
import { SubjectService } from "./subject.service";

@Controller('subjects')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}

    @Post()
    @UsePipes(new ValidationPipe({
        whitelist: true,
        validationError: {
            target: false,
        },
    }))
    async create(@Body() createSubjectDto: CreateSubjectDTO){
        this.subjectService.create(createSubjectDto);
    }

    @Get()
    async getAll(){
        return await this.subjectService.getAll();
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({
        whitelist: true,
        validationError: {
            target: false,
        },
    }))
    async edit(@Param('id') id: number, @Body() createSubjectDTO: CreateSubjectDTO){        
        const subject = await this.subjectService.get(id);
        if (!subject) {
            throw new NotFoundException();
        }
        subject.setName(createSubjectDTO.name);
        await this.subjectService.update(subject);
    } 
}