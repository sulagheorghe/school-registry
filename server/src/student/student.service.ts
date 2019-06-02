import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDTO } from './dto/create-student.dto';
import { GradeGroup } from './grade-group.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  public async createFromDTO(
    studentCreateDTO: CreateStudentDTO,
  ): Promise<Student> {
    const student = new Student(
      studentCreateDTO.firstname,
      studentCreateDTO.lastname,
      studentCreateDTO.email,
      studentCreateDTO.gradeGroup,
    );
    return await this.studentRepo.save(student);
  }

  public async getById(id: number, includeGrade = false): Promise<Student> {
    let findOptions = { relations: [] };
    if (includeGrade) {
      findOptions.relations = ['gradeGroup'];
    }
    return await this.studentRepo.findOne(id, findOptions);
  }

  public async update(
    toBeUptated: Student,
    source: CreateStudentDTO,
  ): Promise<Student> {
    this.studentRepo.merge(toBeUptated, source);
    return await this.studentRepo.save(toBeUptated);
  }

  public async getAll(): Promise<Student[]> {
    return await this.studentRepo.find({ relations: ['gradeGroup'] });
  }

  public async getGradeGroupsStudent(
    gradeGroup: GradeGroup,
  ): Promise<Student[]> {
    return await this.studentRepo.find({
      where: {
        gradeGroup: gradeGroup.id,
      },
      relations: ['gradeGroup'],
    });
  }
}
