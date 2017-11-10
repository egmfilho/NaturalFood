import { Component, Input } from '@angular/core';

import { Food } from '../../models/food.model';

/**
 * Generated class for the FoodCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
	selector: 'food-card',
	templateUrl: 'food-card.html'
})
export class FoodCardComponent {
	
	@Input() food: Food;
	@Input() selectCallback: Function;
	
	constructor() {
		console.log('Hello FoodCardComponent Component');
	}

	select() {
		if (this.selectCallback)
			this.selectCallback(this.food);
	}
	
}
