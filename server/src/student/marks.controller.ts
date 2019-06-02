import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Param, NotFoundException, Put, Delete, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateMarkDTO } from "./dto/create-mark.dto";
import { MarkService } from "./mark.service";
import { SubjectService } from "src/subject/subject.service";
import { MonthValidation } from "src/common/pipes/month-validation.pipe";
import { UpdateMarkDTO } from "./dto/update-mark.dto";
import { AuthGuard } from "@nestjs/passport";
import { TransformInterceptor } from "src/common/interceptors/transform.interceptor";

@Controller('marks')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(TransformInterceptor)
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

    @Get('/grade-group/:gradeId/subject/:subjId')
    async getForSubject(
        @Param('gradeId') gradeId: number, 
        @Param('subjId') subjId: number
    ){
        const subject = await this.subjectService.get(subjId);
        if (!subject) {
            throw new NotFoundException();
        }
        return await this.markService.getGradeGroupForSubject(subjId, gradeId);
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