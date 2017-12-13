import { Pipe, PipeTransform } from '@angular/core';
import { Food } from '../models/food.model';

@Pipe({
	name: 'foodFilter',
	pure: false
})
export class FoodFilterPipe implements PipeTransform {
	transform(items: Food[], query: string, planId: number): any {
		if (!items || (!query && !planId)) {
			return items;
		}

		return items.filter(item => {
			return planId ? item.planId == planId : true;
		}).filter(item => {
			return !!query ? item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 : true;
		});
	}
}
