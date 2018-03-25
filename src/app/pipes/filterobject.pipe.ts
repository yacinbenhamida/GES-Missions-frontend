import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Fonction } from '../model/fonction';

@Pipe({
    name: 'filterobj'
})

@Injectable()
export class FilterPipeObj implements PipeTransform {
    public transform(values: any[], filter: string): any[] {
        if (!values || !values.length) return [];
        if (!filter) return values;
        // Filter items array, items which match will return true
        return values.filter(v => v.nomAr.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
      }
}