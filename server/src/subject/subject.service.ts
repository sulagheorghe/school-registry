import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Subject } from "./subject.entity";
import { CreateSubjectDTO } from "./dto/createSubject.dto";
import { ISubject } from "../../../common/interfaces/subject.interface";

@Injectable()
export class SubjectService {
    constructor (@InjectRepository(Subject) 
    private readonly subjRepo: Repository<Subject>){

    }

    async create(createSubjectDTO: ISubject) : Promise<ISubject> {
        const subject = new Subject(createSubjectDTO.name);
        return await this.subjRepo.save(subject);
    }

    async getAll(): Promise<ISubject[]> {
        return await this.subjRepo.find();
    }   

    async get(id: number): Promise<Subject> {
        return await this.subjRepo.findOne(id)
    }

    async update(subject: Subject):Promise<Subject> {
        return await this.subjRepo.save(subject);
    }
}