import { Pipe, PipeTransform } from '@angular/core';
import numeral from 'numeral';

@Pipe({ name: 'numeral' })
export class NumeralCustomPipe implements PipeTransform {
    transform(value: string, format: string = ''): string | any {
        const val = numeral(value);
        if (format) {
            return val.format(format);
        } else {
            return val.value();
        }
    }
}