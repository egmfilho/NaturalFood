import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { Push } from '@ionic-native/push';

// import { HomePage } from './../home/home';
import { FoodListPage } from '../food-list/food-list';
import { RegisterPage } from './../register/register';
import { Utils } from '../../services/utils.service';
import { User } from '../../models/user.model';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	user: string;
	pass: string;

	private canFingerprint;

	constructor(public navCtrl: NavController, public navParams: NavParams, private fingerPrint: FingerprintAIO, private push: Push, private utils: Utils) {
		this.canFingerprint = false;
	}

	ionViewDidEnter() {
		// if (this.utils.platform.is('cordova')) {
		// 	this.utils.platform.ready().then(success => {
		// 		this.logInUsingFingerprint();
		// 	})
		// }
		this.autoLogin();
	}

	setPushNotifications() {
		if (this.utils.platform.is('cordova')) {
			this.push.hasPermission()
				.then((res: any) => {

					if (res.isEnabled) {
						this.utils.alert('', 'We have permission to send push notifications', ['ok']).present();
					} else {
						this.utils.alert('', 'We do not have permission to send push notifications', ['ok']).present();
					}

				});
		}
	}

	autoLogin() {
		this.utils.globals.getPersistent('credentials').then(data => {
			if (data) {
				this.login(data.username, data.password);
			}
		});
	}

	showFingerprint() {
		if (this.canFingerprint) {
		
			this.fingerPrint.isAvailable().then(res => {
				
				this.utils.globals.getPersistent('credentials').then(data => {
					this.fingerPrint.show({
						clientId: 'Natural Food',
						localizedFallbackTitle: 'Usar senha',
						localizedReason: 'Acesse sua conta'
					}).then(res => {
						this.login(data.username, data.password);
					});
				});

			});

		}
	}

	logInUsingFingerprint() {
		this.fingerPrint.isAvailable().then(res => {
			this.utils.globals.getPersistent('credentials').then(data => {
				if (data) {
					this.user = data.username;
					this.canFingerprint = true;
					
					this.showFingerprint();
				}
			});
		}, err => console.log('fingerprint not available'));
	}

	login(username, password) {
		let loading = this.utils.loading('Efetuando login');

		loading.present();
		
		this.utils.getHttp().post('login.php', {
			user_user: username,
			user_pass: password
		}).subscribe(success => {
			this.setPushNotifications();

			this.utils.globals.setPersistent('credentials', {
				username: username,
				password: password
			});

			this.utils.globals.setInternal('token', success.data.user_id + ':'  + success.data.user_current_session.user_session_value);
			this.utils.globals.set('user', new User(success.data));
			loading.dismiss();
			// this.navCtrl.setRoot(HomePage);
			this.navCtrl.setRoot(FoodListPage);
		}, error => {
			loading.dismiss();
			let title, msg;

			switch (error.status) {
				case 0: {
					title = 'Erro';
					msg = this.utils.globals.getInternal('errorMessage');
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
