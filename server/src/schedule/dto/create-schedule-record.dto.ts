import { Teacher } from "src/teacher/teacher.entity";
import { Subject } from "src/subject/subject.entity";
import { GradeGroup } from "src/student/grade-group.entity";

export class CreateScheduleRecordDTO {
    dayOfWeek: string;

    teacher: Teacher;

    subject: Subject;

    gradeGroup: GradeGroup
}