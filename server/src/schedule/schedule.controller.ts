import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleRecordDTO } from './dto/create-schedule-record.dto';
import { Schedule } from './schedule.entity';
import { serialize} from 'class-transformer';
import { GradeGroupService } from 'src/student/grade-group.service';

@Controller('schedule')
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService,
        private readonly gradeGroupService: GradeGroupService
        ) {}

    @Post()
    async create(@Body() createScheduleDTO: CreateScheduleRecordDTO): Promise<Schedule> {
        return await this.scheduleService.createRecord(createScheduleDTO);
    } 

    @Get('/grade-group/:id')
    async getGradeGroupSchedules(@Param('id') id: number ): Promise<{}> {
        const gradeGroup = await this.gradeGroupService.getById(id);
        if (!gradeGroup) {
            throw new NotFoundException("Grade group not found");
        }
        const gradeGroupSchedule = await this.scheduleService.getGradeGroupSchedule(id);
        let dailyFormatedSchedule = {}; 
        gradeGroupSchedule.forEach((record) => {
            if (!(record.dayOfWeek in dailyFormatedSchedule)) {
                dailyFormatedSchedule[record.dayOfWeek] = [] 
            }
            dailyFormatedSchedule[record.dayOfWeek].push(record)
        })
        return dailyFormatedSchedule;

    }

    @Get()
    async getAll(){
        const schedules = await this.scheduleService.getAllWithDependecies();
       //return schedules;
        let aresult = [];
        schedules.forEach((schedule) => {
            if (!(schedule.dayOfWeek in aresult)) {
                aresult[schedule.dayOfWeek] = [] 
            }
            const clasa = schedule.gradeGroup.admissionYear + ''+ schedule.gradeGroup.group;
            if (!(clasa in aresult[schedule.dayOfWeek])) {
                aresult[schedule.dayOfWeek][clasa] = [];
            }
            aresult[schedule.dayOfWeek][clasa].push( {"subj": schedule.subject.getName(), "teacher": schedule.teacher.email});
        })
        return aresult;
    }
}
