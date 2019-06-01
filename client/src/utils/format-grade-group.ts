import { GradeGroupInterface } from '../../../common/interfaces/grade-group.interface'

export function formatGradeGroup(gradeGroup: GradeGroupInterface) {
    return `${getGrade(gradeGroup.admissionYear)} - ${gradeGroup.group}`;
}

function getGrade(addminsionYear: number) {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    if (currentMonth >= 9 && currentMonth <= 12) {
        return currentYear - addminsionYear + 1;
    }
    return currentYear - addminsionYear;
}