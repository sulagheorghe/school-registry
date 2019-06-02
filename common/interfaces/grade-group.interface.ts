import { Teacher } from '../../server/src/teacher/teacher.entity';

export interface GradeGroupInterface {
    id?: number, 
    
    admissionYear: number;

    group: string;

    classMaster: Teacher|number;
}