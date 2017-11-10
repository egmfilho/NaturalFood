import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Category } from './../../models/category.model';
import { Utils } from '../../services/utils.service';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	categories : Array<Category>;

	constructor(public navCtrl: NavController, private utils: Utils) {
		
	}

	ngOnInit() {
		this.getCategories();
	}

	getCategories() {
		let loading = this.utils.loading('Carregando'),
			scope = this;

		loading.present();
		this.utils.getHttp().get('product_category.php?action=getList')
			.subscribe(success => {
				this.categories = success.data.map(function(n) {
					return new Category(Category.convertToInternal(n));
				});
				loading.dismiss();
			}, error => {
				loading.dismiss();
				if (error.status != 0) {
					scope.utils.alert('Erro', error.error.status.description, ['OK']).present();
				}
			});
	}

}
