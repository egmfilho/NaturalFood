import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { BasketService } from '../../services/basket.service';
import { Utils } from './../../services/utils.service';

import { Category } from './../../models/category.model';
import { Food } from '../../models/food.model';
import { BasketItem } from '../../models/basketItem.model';


/**
 * Generated class for the FoodListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
*/

@IonicPage()
@Component({
	selector: 'page-food-list',
	templateUrl: 'food-list.html',
})
export class FoodListPage {
	@ViewChild(Content) content: Content;

	category: Category;
	selectedTabId: number;
	plans: any[];
	foods: Food[];

	constructor(public navCtrl: NavController, public navParams: NavParams, private basket: BasketService, private utils: Utils) {
		// this.category = navParams.get('category') as Category;
		this.plans = [];
		this.selectedTabId = 0;
	}
	
	ionViewDidLoad() {
		
	}

	ngOnInit() {
		this.getPlans();
		this.getFoodList();
	}

	getPlans() {
		this.utils.getHttp().get('plan.php?action=getList').subscribe(success => {
			this.plans = success.data.map((p) => {
				if (p.plan_active == 'Y') {
					return {
						id: p.plan_id,
						name: p.plan_name
					}
				}
			});
			this.content.resize();
			this.selectedTabId = this.plans[0].id;
		}, error => {
			console.log(error);
		});
	}

	getFoodList() {
		let loading = this.utils.loading('Carregando');

		loading.present();
		this.utils.getHttp().get('product.php?action=getList').subscribe(success => {
			this.foods = success.data.map(n => new Food(n));
			loading.dismiss();
		}, error => {
			loading.dismiss();
		});
	}

	// Sintaxe anti bug para manter o ponteiro this apontando para esta classe
	selectFood = (food: Food) => {
		var buttons = [{ 
			text: 'Sim',
			handler: () => {
				this.basket.addItem(new BasketItem({
					food: food,
					quantity: 1
				}));

				if (this.basket.getItems().length == 1) {
					this.content.resize();
				}
				
				this.utils.alert('Sucesso', 'Prato adicionado!', ['OK']).present();
			}
		}, { 
			text: 'Não', 
			role: 'cancel' 
		}];

		this.utils.alert('Aviso', 'Deseja adicionar este prato ao pedido?', buttons).present();
	}
	
}
