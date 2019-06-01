import { Teacher } from "src/teacher/teacher.entity";

export interface GradeGroupInterface {
    admissionYear: number;

    group: string;

    classMaster: Teacher;
}