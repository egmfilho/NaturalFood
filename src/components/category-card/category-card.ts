import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Category } from './../../models/category.model';
import { FoodListPage } from './../../pages/food-list/food-list';

/**
 * Generated class for the CategoryCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
*/
@Component({
	selector: 'category-card',
	templateUrl: 'category-card.html'
})
export class CategoryCardComponent {
	@Input() category: Category;
		
	constructor(private navController: NavController) {
		
	}

	openCategory() {
		this.navController.push(FoodListPage, {
			category: this.category
		});
	}
	
}
