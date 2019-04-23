import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Subject } from "./subject.entity";
import { CreateSubjectDTO } from "../DTO/createSubject.dto";

@Injectable()
export class SubjectService {
    constructor (@InjectRepository(Subject) 
    private readonly subjRepo: Repository<Subject>){

    }

    async create(createSubjectDTO: CreateSubjectDTO) : Promise<Subject> {
        const subject = new Subject(createSubjectDTO.name);
        return await this.subjRepo.save(subject);
    }

    async getAll(): Promise<Subject[]> {
        return await this.subjRepo.find();
    }   

    async get(id: number): Promise<Subject> {
        return await this.subjRepo.findOne(id)
    }

    async update(subject: Subject):Promise<Subject> {
        return await this.subjRepo.save(subject);
    }
}