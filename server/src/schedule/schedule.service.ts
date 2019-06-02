import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { CreateScheduleRecordDTO } from './dto/create-schedule-record.dto';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(Schedule) private readonly scheduleRepo: Repository<Schedule>
        ) {}
    
    public async createRecord(createScheduleDTO: CreateScheduleRecordDTO): Promise<Schedule> {
        const scheduleRecord = new Schedule(
            createScheduleDTO.dayOfWeek, 
            createScheduleDTO.subject,
            createScheduleDTO.teacher,
            createScheduleDTO.gradeGroup)
        return this.scheduleRepo.save(scheduleRecord);
    }

    public async getAllWithDependecies(): Promise<Schedule[]> {
        return this.scheduleRepo.find({relations: ['teacher', 'subject','gradeGroup']});
    }

    public async getGradeGroupSchedule(id: number): Promise<Schedule[]> {
        return await this.scheduleRepo.find({
            where: {
                gradeGroup: id
            },
            relations: ['teacher', 'subject','gradeGroup']
        });
    }

}
