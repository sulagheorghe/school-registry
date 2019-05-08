import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Param, NotFoundException, Put, Delete } from "@nestjs/common";
import { CreateMarkDTO } from "./dto/create-mark.dto";
import { MarkService } from "./mark.service";
import { SubjectService } from "src/subject/subject.service";
import { MonthValidation } from "src/common/pipes/month-validation.pipe";
import { UpdateMarkDTO } from "./dto/update-mark.dto";

@Controller('marks')
export class MarksController {
    constructor(
        private readonly markService: MarkService,
        private readonly subjectService: SubjectService,
    ) {}

    @Post()
    @UsePipes(new ValidationPipe({
        transform: true,
        validationError: {
            target: false
        }
    }))
    async create(@Body() createMarkDto: CreateMarkDTO) {
        return this.markService.createFromDTO(createMarkDto);
    }

    @Get('subject/:id/month/:month')
    async getForSubject(
        @Param('id') subjectId: number, 
        @Param('month', new MonthValidation()) monthOrder: number
    ){
        const subject = await this.subjectService.get(subjectId);
        if (!subject) {
            throw new NotFoundException();
        }
        return await this.markService.getAllBySubjectAndMonth(subject, monthOrder);
    }

    @Put(':id')
    async editMark(@Param('id') id: number, @Body() updateMarkDto: UpdateMarkDTO) {
        const mark = await this.markService.getById(id);
        if (!mark) {
            throw new NotFoundException();
        }
        return await this.markService.updateFromDto(mark, updateMarkDto);
    }
    
    @Delete(':id')
    async delete(@Param('id') id:number) {
        const mark = await this.markService.getById(id);
        if (!mark) {
            throw new NotFoundException();
        }
        await this.markService.delete(mark);
    }
}