export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'

export const dayOfWeeks: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export function getDayOfWeek(dayOfWeek: DayOfWeek): number {
    return dayOfWeeks.indexOf(dayOfWeek) + 1;
}
