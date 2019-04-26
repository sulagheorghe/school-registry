import { GradeGroup } from "../grade-group.entity";
import { IsAlpha, Length, IsEmail, IsNumber } from "class-validator";

export class CreateStudentDTO {
    @IsAlpha({
        message: "Prenumele contine doar litere"
    })
    @Length(3, 32, {
        message: "Prenumele trebuie sa contina minim 3 si maxim 32 caractere"        
    })
    firstname: string;

    @IsAlpha({
        message: "Numele contine doar litere"
    })
    @Length(3, 32, {
        message: "Numele trebuie sa contina minim 3 si maxim 32 caractere"        
    })
    lastname: string;

    @IsEmail({
        
    }, {
        message: "Email-ul este invalid"
    })
    email: string;

    @IsNumber({
        allowNaN : false
    }, {
        message: "Selectati clasa"
    })
    gradeGroup: GradeGroup;

}