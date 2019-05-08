import { Injectable, PipeTransform, NotFoundException } from "@nestjs/common";

@Injectable()
export class MonthValidation implements PipeTransform<number, number> {
    transform(monthOrder: number): number {
        if (monthOrder < 0 || monthOrder > 12 || (monthOrder > 5 && monthOrder < 9)) {
            throw new NotFoundException();
        }
        return monthOrder - 1;
    }
}