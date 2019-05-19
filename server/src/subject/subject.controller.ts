import { Controller, Post, Body, Get, Put, Param, UsePipes, ValidationPipe, NotFoundException, UseGuards } from "@nestjs/common";
import { CreateSubjectDTO } from "./dto/createSubject.dto";
import { SubjectService } from "./subject.service";
import { AuthGuard } from "@nestjs/passport";
import { ISubject } from "../../../common/interfaces/subject.interface";

@Controller('subjects')
@UseGuards(AuthGuard('jwt'))
export class SubjectController  {
    constructor(private readonly subjectService: SubjectService) {}

    @Post()
    @UsePipes(new ValidationPipe({
        whitelist: true,
        validationError: {
            target: false,
        },
    }))
    async create(@Body() createSubjectDto: CreateSubjectDTO): Promise<ISubject>{
        return this.subjectService.create(createSubjectDto);
    }

    @Get()
    async getAll(){
        return await this.subjectService.getAll();
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({
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
        return await this.subjectService.update(subject);
    } 
}