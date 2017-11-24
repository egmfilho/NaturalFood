import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BasketService } from '../../services/basket.service';
import { BasketItem } from '../../models/basketItem.model';
import { Utils } from '../../services/utils.service';

/**
 * Generated class for the OrderItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-order-items',
	templateUrl: 'order-items.html',
})
export class OrderItemsPage {
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public basket: BasketService, private utils: Utils) {
	}
	
	ionViewDidLoad() {

	}

	increaseItem(item: BasketItem) {
		item.quantity++;
	}

	decreaseItem(item: BasketItem) {
		if (item.quantity == 1) {
			this.removeItem(item);
		} else {
			item.quantity--;
		}
	}

	removeItem(item: BasketItem) {
		var buttons = [{ 
			text: 'Sim',
			handler: () => {
				this.basket.removeItem(item);
				this.utils.alert('Sucesso', 'Prato removido!', ['OK']).present();
			}
		}, { 
			text: 'Não', 
			role: 'cancel' 
		}];

		this.utils.alert('Aviso', 'Deseja remover este prato?', buttons).present();
	}
	
}
