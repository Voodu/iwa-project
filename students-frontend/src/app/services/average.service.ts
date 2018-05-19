import { Injectable } from '@angular/core';
import { Gradeable } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AverageService {

    constructor() { }

    getAverage(grades: Gradeable[]) {
        return grades.reduce((a, g) => a + g.grade * g.weight, 0) /
            grades.reduce((a, g) => a + g.weight, 0) || 0;
    }
}
