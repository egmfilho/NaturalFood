import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Utils } from './../../services/utils.service';

import { Category } from './../../models/category.model';

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
	
	category: Category;

	foodCards: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private utils: Utils) {
		this.category = navParams.get('category') as Category;

		this.foodCards = [{
			image: 'assets/dummy/almondegas.PNG',
			title: 'Almôndegas Fit (com aveia)',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet justo magna. Fusce sagittis sollicitudin ornare. Duis erat ipsum, lacinia eu mi vel, venenatis euismod orci. Fusce ultricies eleifend ex eu rhoncus.'
		}, {
			image: 'http://i.ndtvimg.com/mt/cooks/2014-11/chicken.jpg',
			title: 'Estrombelete de pombo obeso',
			description: 'Cras fringilla elit sed ex sodales placerat. Nullam iaculis egestas vehicula. In ut interdum sem, in vulputate nibh. Ut vitae bibendum nisl, vitae gravida magna.'
		}];
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad FoodListPage');
	}

	ngOnInit() {
		this.getFoodList();
	}

	getFoodList() {
		let loading = this.utils.loading('Carregando');

		loading.present();
		this.utils.getHttp().get('product.php?action=getList').subscribe(success => {
			loading.dismiss();
		}, error => {
			loading.dismiss();
		});
	}
	
}
