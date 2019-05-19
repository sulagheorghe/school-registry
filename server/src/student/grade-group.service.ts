import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GradeGroup } from "./grade-group.entity";
import { Repository } from "typeorm";
import { CreateGradeGroupDTO } from "./dto/create-grade-group.dto";
import { GradeGroupInterface } from "./interfaces/grade-group.interface";

@Injectable()
export class GradeGroupService {
    constructor(
        @InjectRepository(GradeGroup) private readonly gradeGroupRepo: Repository<GradeGroup>
    ){}

    public async create(createGradeGroupDto: CreateGradeGroupDTO): Promise<GradeGroup> {
        const gradeGroup = new GradeGroup(
            createGradeGroupDto.admissionYear,
            createGradeGroupDto.group,
            createGradeGroupDto.classMaster);
        
        return await this.gradeGroupRepo.save(gradeGroup);
    }

    public async getAll(): Promise<GradeGroup[]> {
        return await this.gradeGroupRepo.find({relations: ["classMaster"]});
    }

    public async getById(id: number): Promise<GradeGroup> {
        return await this.gradeGroupRepo.findOne(id, {relations: []});
    }
    
    public async updateFromDTO(toBeUpdated: GradeGroup, source: GradeGroupInterface): Promise<GradeGroup> {
        this.gradeGroupRepo.merge(toBeUpdated, source);
        return await this.gradeGroupRepo.save(toBeUpdated);
    }
}