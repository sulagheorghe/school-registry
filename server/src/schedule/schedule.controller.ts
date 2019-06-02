import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleRecordDTO } from './dto/create-schedule-record.dto';
import { Schedule } from './schedule.entity';
import { GradeGroupService } from 'src/student/grade-group.service';
import { SubjectService } from 'src/subject/subject.service';

@Controller('schedules')
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService,
        private readonly gradeGroupService: GradeGroupService,
        private readonly subjectService: SubjectService
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

    @Get('/grade-group/:groupId/subjects/:subjectId')
    async getGradeGroup(@Param('groupId') groupId: number, @Param('subjectId') subjectId: number):Promise<Schedule[]> {
               
        const gradeGroup = await this.gradeGroupService.getById(groupId);
        if (!gradeGroup) {
            throw new NotFoundException("not grade group");
        }
        const subject = await this.subjectService.get(subjectId);
        if (!subject) {
            throw new NotFoundException("not subject");
        }
        return await this.scheduleService.getGradeGroupSubjectSchedule(gradeGroup, subject);
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
