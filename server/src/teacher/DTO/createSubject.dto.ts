import { IsAlpha } from "class-validator";

export class CreateSubjectDTO {
    
    @IsAlpha({
        message: "Numele trebuie sa contina doar litere"
    })
    readonly name;
}