import { Controller, Post, Body } from "@nestjs/common";
import { CreateGradeGroupDTO } from "./dto/create-grade-group.dto";

@Controller('grade-group')
export class GradeGroupController {

    @Post()
    async create(@Body() createGradeDTO: CreateGradeGroupDTO){
       console.log(createGradeDTO.classMaster);
    }
}