import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { Globals } from './../../services/globals.service';

import { Category } from './../../models/category.model';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	categories : Array<Category>;

	constructor(public navCtrl: NavController, private http: HttpClient, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private globals: Globals) {
		
	}

	ngOnInit() {
		this.getCategories();
	}

	getCategories() {
		let loading = this.loadingCtrl.create({
			content: 'Carregando...'
		});

		loading.present();
		this.http.get(this.globals.getInternal('api') + 'product_category.php?action=getList')
			.subscribe(success => {
				this.categories = success.data.map(function(n) {
					return new Category(Category.convertToInternal(n));
				});
				loading.dismiss();
			}, error => {
				loading.dismiss();
				if (error.status != 0) {
					this.alertCtrl.create({
						title: 'Erro',
						subTitle: error.error.status.description,
						buttons: ['OK']
					}).present();
				}
			});
	}

}
