import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Fonction } from '../model/fonction';

@Pipe({
    name: 'filterfct'
})

@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        if (!items) {
            return [];
        }
        if (!field || !value) {
            return items;
        }
        if(Number(value)) return items.filter(sg => (sg[field] == (Number(value)) || value.indexOf(sg[field]) >-1 ));
        return items.filter(singleItem => singleItem[field].toLowerCase().includes(value.toLowerCase()));
    }
}