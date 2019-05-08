import { Teacher } from "src/teacher/teacher.entity";

export interface GradeGroupInterface {
    addmisionYear: number;

    group: string;

    classMaster: Teacher;
}