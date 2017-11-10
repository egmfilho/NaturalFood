import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from './../home/home';
import { RegisterPage } from './../register/register';
import { Utils } from '../../services/utils.service';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, private utils: Utils) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	login(username, password) {
		let loading = this.utils.loading('Efetuando login');

		loading.present();
		
		this.utils.getHttp().post('login.php', {
			user_user: username,
			user_pass: password
		}).subscribe(success => {
			this.utils.globals.setInternal('token', success.data.user_id + ':'  + success.data.user_current_session.user_session_value);
			this.utils.globals.set('user', {
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

			this.utils.alert(title, msg, ['OK']).present();
		});
	}

	forgottenPass() {

	}

	register() {
		this.navCtrl.push(RegisterPage);
	}

}
