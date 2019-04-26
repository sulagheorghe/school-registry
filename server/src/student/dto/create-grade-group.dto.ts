import { Teacher } from "src/teacher/teacher.entity";

export class CreateGradeGroupDTO {
    
    addmisionYear: number;

    group: string;

    classMaster: Teacher;
}