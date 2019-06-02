import { Controller, Post, Body, Get, UseInterceptors, Put, Param, NotFoundException, UseGuards } from "@nestjs/common";
import { CreateGradeGroupDTO } from "./dto/create-grade-group.dto";
import { GradeGroupService } from "./grade-group.service";
import { GradeGroup } from "./grade-group.entity";
import { TransformInterceptor } from "src/common/interceptors/transform.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { async } from "rxjs/internal/scheduler/async";

@Controller('/grade-groups')
@UseInterceptors(TransformInterceptor)
@UseGuards(AuthGuard('jwt'))
export class GradeGroupController {
    constructor(private readonly gradeGroupService : GradeGroupService) {}

    @Post()
    async create(@Body() createGradeDTO: CreateGradeGroupDTO){
      return await this.gradeGroupService.create(createGradeDTO);
    }

    @Get()
    async getAll(): Promise<GradeGroup[]> {
        return await this.gradeGroupService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<GradeGroup> {
        const gradeGroup = await this.gradeGroupService.getById(id);
        if (!gradeGroup) {
            throw new NotFoundException();
        }
        return gradeGroup;
    }

    @Put(':id')
    async edit(@Param('id') id: number, @Body() createGradeGroupDTO: CreateGradeGroupDTO) {
        const gradeGroup = await this.gradeGroupService.getById(id);
        if (!gradeGroup) {
            throw new NotFoundException();
        }
        return await this.gradeGroupService.updateFromDTO(gradeGroup, createGradeGroupDTO);
    }
}