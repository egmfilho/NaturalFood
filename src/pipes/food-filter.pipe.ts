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

		// var terms = query.toLowerCase().split(' ');

		// var res = items.filter((item) => {
		// 	item.relevance = 0;
		// 	if (item.name.toLowerCase().indexOf(query) !== -1)
		// 		item.relevance += 100;

		// 	for (var i in terms) {
		// 		if (item.name.toLowerCase().indexOf(terms[i]) !== -1)
		// 			item.relevance += 10;

		// 		for (var j in item.tags) {
		// 			if (item.tags[j].toLowerCase() == terms[i])
		// 				item.relevance++;
		// 		}
		// 	}
			
		// 	return item.relevance > 0;
		// }).sort((a, b) => a.relevance - b.relevance);

		// console.log(res);
		// return res;

		return items.filter(item => item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
	}
}
