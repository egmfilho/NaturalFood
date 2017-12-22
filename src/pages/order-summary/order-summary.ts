import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../services/utils.service';
import { User } from '../../models/user.model';
import { BasketService } from '../../services/basket.service';
import { FoodListPage } from '../food-list/food-list';
import { Address } from '../../models/address.model';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AddressesPage } from '../addresses/addresses';

/**
 * Generated class for the OrderSummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-order-summary',
	templateUrl: 'order-summary.html',
})
export class OrderSummaryPage {

	user: User;
	basket: BasketService;
	address: Address;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, public basketService: BasketService, private utils: Utils) {
		this.user = this.utils.globals.get(this.utils.constants.USER);
		this.address = new Address(this.user.person.address[0]);
		this.basket = this.basketService;
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad OrderSummaryPage');
	}

	getAddress() {
		this.utils.getHttp().post('address.php?action=getList', {
			person_id: this.user.personId
		}).subscribe(success => {
			console.log(success);
		}, error => {
			this.utils.alert('Erro', 'Erro ao obter os endereços', ['Ok']).present();
		});
	}

	generateOrderObject() {
		return {
			person_id: this.user.personId,
			delivery_address_id: this.address.id,
			order_items: this.basket.getItems().map(i => {
				return {
					product_id: i.food.id,
					order_item_amount: i.quantity,
					order_item_value_total: i.getPrice()
				}
			}),
			order_value_total: this.basket.getPrice()
		}
	}

	chooseAddress() {
		let modal = this.modalCtrl.create(AddressesPage);
		modal.present();
	}

	confirm() {
		let loading = this.utils.loading('Enviando pedido...');
		loading.present();

		this.utils.getHttp().post('budget.php?action=insert', this.generateOrderObject())
			.subscribe(success => {
				loading.dismiss();
				this.navCtrl.setRoot(FoodListPage);
			}, error => {
				loading.dismiss();
				this.utils.alert('Erro', 'Não foi possível enviar o pedido. Tente novamente mais tarde.', ['Ok'])
					.present();
			});

	}
	
}
