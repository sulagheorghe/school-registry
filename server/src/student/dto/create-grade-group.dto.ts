import { Teacher } from "src/teacher/teacher.entity";

export class CreateGradeGroupDTO {
    
    admisionYear: number;

    group: string;

    classMaster: Teacher;
}