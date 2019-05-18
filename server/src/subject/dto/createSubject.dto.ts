import { IsAlpha, Matches } from "class-validator";
import { ISubject} from '../../../../common/interfaces/subject.interface';

export class CreateSubjectDTO implements ISubject{

    readonly id?: number
    
    @Matches( /^[a-zA-Z\s]*$/,{
        message: "Numele trebuie sa contina doar litere"
    })
    readonly name: string;
}