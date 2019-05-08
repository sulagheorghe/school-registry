import { Type } from "class-transformer";
import { Student } from "../student.entity";
import { Subject } from "src/subject/subject.entity";
import { Teacher } from "src/teacher/teacher.entity";

export class CreateMarkDTO {
    mark: number;

    isPresent: boolean;
    //yyyy-mm-dd
    @Type(() => Date)
    planedOn: Date;

    student: Student;

    subject: Subject;

    teacher: Teacher;
}