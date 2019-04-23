import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator } from "class-validator";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "src/teacher/teacher.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";


@ValidatorConstraint({async: true})
@Injectable()
export class IsTeacherExistConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>
        ){}

    async validate(email: any, args: ValidationArguments) {
        console.log(email);
        return await this.teacherRepo.findOne({"where": {email: email} })? false: true;
    }
}

export function IsTeacherExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsTeacherExistConstraint
        });
   };
}