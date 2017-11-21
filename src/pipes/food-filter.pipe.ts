import { Pipe, PipeTransform } from '@angular/core';
import { Food } from '../models/food.model';

@Pipe({
	name: 'foodFilter',
	pure: false
})
export class FoodFilterPipe implements PipeTransform {
	transform(items: Food[], query: string): any {
		if (!items || !query) {
			return items;
		}

		return items.filter(item => item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
	}
}
