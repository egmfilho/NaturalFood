import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { OrderItemsPage } from './../../pages/order-items/order-items';

import { BasketService } from './../../services/basket.service';

/**
 * Generated class for the BasketComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
	selector: 'basket',
	templateUrl: 'basket.html'
})

export class BasketComponent {
	
	constructor(public navCtrl: NavController, private basketService: BasketService) {
		
	}

	getTextInfo() {
		let quantity = this.basketService.getItems().length,
			info = quantity == 1 ? 'item selecionado' : 'itens selecionados';

		return `${quantity} ${info}`;
	}

	isVisible() {
		return this.basketService.getItems().length > 0;
	}

	showOrderItems() {
		this.navCtrl.push(OrderItemsPage);
	}
}
