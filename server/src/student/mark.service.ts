import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mark } from './mark.entity';
import { Repository, Between, createQueryBuilder } from 'typeorm';
import { CreateMarkDTO } from './dto/create-mark.dto';
import { Subject } from 'src/subject/subject.entity';
import { UpdateMarkDTO } from './dto/update-mark.dto';

@Injectable()
export class MarkService {
  constructor(
    @InjectRepository(Mark) private readonly markRepo: Repository<Mark>,
  ) {}

  async createFromDTO(createMarkDto: CreateMarkDTO): Promise<Mark> {
    const mark = new Mark(
      createMarkDto.mark,
      createMarkDto.planedOn,
      createMarkDto.student,
      createMarkDto.subject,
      createMarkDto.teacher,
      createMarkDto.isPresent,
    );
    return await this.markRepo.save(mark);
  }

  async getGradeGroupForSubject(
    subjectId: number,
    gradeId: number,
  ): Promise<any[]> {
    return await createQueryBuilder('Mark')
      .leftJoinAndSelect('Mark.student', 'student')
      .where('student.gradeGroup = :gradeId', { gradeId: gradeId })
      .getMany();
  }

  //month should not be gt 11
  async getAllBySubjectAndMonth(
    subject: Subject,
    monthOrder: number,
  ): Promise<Mark[]> {
    const today = new Date();
    const currentYear = today.getFullYear();
    const firstDate = new Date(currentYear, monthOrder, 1);
    const lastDate = new Date(currentYear, monthOrder + 1, 0);
    return await this.markRepo.find({
      relations: ['subject', 'student'],
      where: {
        planedOn: Between(firstDate, lastDate),
        subject: subject,
      },
    });
  }

  async getById(id: number): Promise<Mark> {
    return this.markRepo.findOne(id);
  }

  async updateFromDto(toBeUpdated: Mark, source: UpdateMarkDTO): Promise<Mark> {
    this.markRepo.merge(toBeUpdated, source);
    return this.markRepo.save(toBeUpdated);
  }

  async delete(mark: Mark): Promise<Mark> {
    return this.markRepo.remove(mark);
  }
}
