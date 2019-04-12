
import { IsString, IsNotEmpty, IsAlpha, MinLength, MaxLength, IsEmail, Length, ValidationArguments, IsNumberString } from 'class-validator';
import { IsTeacherExist } from '../validator/decorator/IsTeacherExist';

export default class CreateTeacherDTO {
    
    @IsAlpha({
        message: "Prenumele trebuie sa contina doar litere"
    })
    @MinLength(3,{
        message: "Prenumele trebuie sa contina minimum 3 caractere"
    })
    @MaxLength(50,{ 
        message: "Prenumele nu poate contine mai mult de 50 caractere"
    })
    readonly firstName: string;

    @IsAlpha({
        message: "Numele trebuie sa contina doar litere"
    })
    @MinLength(3,{
        message: "Numele trebuie sa contina minimum 3 caractere"
    })
    @MaxLength(50,{ 
        message: "Numele nu poate contine mai mult de 50 caractere"
    })
    readonly lastName: string;

    @IsEmail({},{
        message: "Introduce-ti o adresa de e-mail valid"
    })
    @IsTeacherExist({
        message: "Adresa de email este deja utilizata de un profesor"
    })
    readonly email: string;

    @IsNotEmpty()
    readonly role: string;

    @Length(9,9, {
        message: (args: ValidationArguments) => {
           return "Numarul de telefon trebuie sa contina 9 cifre, dar contine " + args.value.length; 
        } 
    })
    @IsNumberString({
        message: "Doar cifre sunt acceptate"
    })
    readonly phoneNumber: string;
}