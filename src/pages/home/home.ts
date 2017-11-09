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
		this.categories = [
			new Category({
				id: 1001,
				imageUrl: 'http://naturalsociety.com/wp-content/uploads/soil-dirt-plant-735-350.jpg',
				title: 'Categoria 1',
				subtitle: 'Subtitulo da categoria 1'
			}),
			new Category({
				id: 1002,
				imageUrl: 'http://www.juicingnation.com/wp-content/uploads/2017/09/fruits-for-juicing.jpg',
				title: 'Categoria 2',
				subtitle: 'Subtitulo da categoria 2'
			}),
			new Category({
				id: 1003,
				imageUrl: 'http://urbantastebud.com/wp-content/uploads/2015/08/bottled-juices_0.jpg',
				title: 'Categoria 3',
				subtitle: 'Subtitulo da categoria 3'
			})
		];
	}

	ngOnInit() {
		this.getCategories();
	}

	getCategories() {
		let loading = this.loadingCtrl.create({
			content: 'Carregando categorias...'
		});

		loading.present();
		this.http.get(this.globals.getInternal('api') + 'product_category.php?action=getList')
			.subscribe(success => {
				console.log(success);
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
