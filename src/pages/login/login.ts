import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { Globals } from './../../services/globals.service';

import { HomePage } from './../home/home';
import { RegisterPage } from './../register/register';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private globals: Globals) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	login(username, password) {
		let loading = this.loadingCtrl.create({
			content: 'Efetuando login'
		});

		loading.present();

		this.http.post(this.globals.getInternal('api') + 'login.php', {
			user_user: username,
			user_pass: password
		}).subscribe(success => {
			this.globals.setInternal('token', success.data.user_id + ':'  + success.data.user_current_session.user_session_value);
			this.globals.set('user', {
				name: success.data.user_name,
				email: success.data.user_mail,
				avatar: success.data.image.image_uri + 'small.jpg'
			});
			loading.dismiss();
			this.navCtrl.setRoot(HomePage);
		}, error => {
			loading.dismiss();
			let title, msg;

			switch (error.status) {
				case 0: {
					title = 'Erro';
					msg = 'Não foi possível estabelecer uma conexão com o servidor. Tente novamente mais tarde.';
					break;
				}

				case 404: {
					title = 'Aviso';
					msg = 'Usuário ou senha incorretos.';
					break;
				}

				case 504: {
					title = 'Aviso';
					msg = 'Não foi possível estabelecer uma conexão com o servidor. Verifique sua conexão com a internet.';
					break;
				}

				default: {
					title = 'Erro';
					msg = error.error.status.description;
				}
			}

			this.alertCtrl.create({
				title: title,
				subTitle: msg,
				buttons: ['OK']
			}).present();
		});
	}

	forgottenPass() {

	}

	register() {
		this.navCtrl.push(RegisterPage);
	}

}
