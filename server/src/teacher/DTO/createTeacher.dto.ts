
import { IsString, IsNotEmpty, IsAlpha, MinLength, MaxLength, IsEmail, Length, ValidationArguments, IsNumberString } from 'class-validator';
import { IsTeacherExist } from '../validator/decorator/IsTeacherExist';

export default class CreateTeacherDTO {
    
    @IsAlpha({
        message: "Prenumele trebuie sa contina doar litere",
        groups: ["create","update"]
    })
    @MinLength(3,{
        message: "Prenumele trebuie sa contina minimum 3 caractere",
        groups: ["create","update"]
    })
    @MaxLength(50,{ 
        message: "Prenumele nu poate contine mai mult de 50 caractere",
        groups: ["create","update"]
    })
    readonly firstName: string;

    @IsAlpha({
        message: "Numele trebuie sa contina doar litere",
        groups: ["create","update"]
    })
    @MinLength(3,{
        message: "Numele trebuie sa contina minimum 3 caractere",
        groups: ["create","update"]
    })
    @MaxLength(50,{ 
        message: "Numele nu poate contine mai mult de 50 caractere",
        groups: ["create","update"]
    })
    readonly lastName: string;

    @IsEmail({},{
        message: "Introduce-ti o adresa de e-mail valida",
        groups: ["create","update"]
    })
    @IsTeacherExist({
        message: "Adresa de email este deja utilizata de un profesor",
        groups: ["create"] 
    })
    readonly email: string;

    @IsNotEmpty({
        message: "Selectati un rol",
        groups: ["create","update"]
    })
    readonly role: string;

    @Length(9,9, {
        message: (args: ValidationArguments) => {
           return "Numarul de telefon trebuie sa contina 9 cifre, dar contine " + args.value.length; 
        },
        groups: ["create","update"] 
    })
    @IsNumberString({
        message: "Doar cifre sunt acceptate",
        groups: ["create","update"]
    })
    readonly phoneNumber: string;
}