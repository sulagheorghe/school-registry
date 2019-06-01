import { Teacher } from "src/teacher/teacher.entity";
import { GradeGroupInterface } from "../../../../common/interfaces/grade-group.interface";

export class CreateGradeGroupDTO implements GradeGroupInterface{
    
    admissionYear: number;

    group: string;

    classMaster: Teacher;
}