import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

// import { HomePage } from './../home/home';
import { FoodListPage } from '../food-list/food-list';
import { RegisterPage } from './../register/register';
import { Utils } from '../../services/utils.service';
import { User } from '../../models/user.model';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	user: string;
	pass: string;
	isLoading: boolean;

	private canFingerprint;

	constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar: StatusBar, private menuController: MenuController, private fingerPrint: FingerprintAIO, private utils: Utils) {
		this.isLoading = false;
		this.canFingerprint = false;
	}

	ionViewDidEnter() {
		this.statusBar.overlaysWebView(true);
		this.menuController.swipeEnable(false);

		/* Login via impressao digital */
		// if (this.utils.platform.is('cordova')) {
		// 	this.utils.platform.ready().then(success => {
		// 		this.logInUsingFingerprint();
		// 	})
		// }
	}

	ionViewWillLeave() {
		this.statusBar.overlaysWebView(false);
		this.menuController.swipeEnable(true);
	}

	showFingerprint() {
		if (this.canFingerprint) {
		
			this.fingerPrint.isAvailable().then(res => {
				
				this.utils.globals.getPersistent(this.utils.constants.CREDENTIALS).then(data => {
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
			this.utils.globals.getPersistent(this.utils.constants.CREDENTIALS).then(data => {
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
		
		this.isLoading = true;
		this.utils.getHttp().post('login.php', {
			user_user: username,
			user_pass: password
		}).subscribe(success => {
			var user = new User(success.data);
			this.utils.imageUrlToUri(user.imageUrl).then((uri) => {
				if (uri && uri.length)
					user.imageData = uri;
				
				this.utils.setPushNotification();
				this.utils.globals.setInternal(this.utils.constants.TOKEN, user.id + ':'  + success.data.user_current_session.user_session_value);
				this.utils.globals.set(this.utils.constants.USER, user);
				this.utils.globals.setPersistent(this.utils.constants.CREDENTIALS, {
					avatar: user.imageData,
					name: user.name,
					username: username,
					password: password
				});

				loading.dismiss();
				this.isLoading = false;
				this.navCtrl.setRoot(FoodListPage);
			});
		}, error => {
			loading.dismiss();
			let title, msg;

			this.isLoading = false;
			switch (error.status) {
				case 0: {
					title = 'Erro';
					msg = this.utils.globals.getInternal(this.utils.constants.ERROR_MESSAGE);
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
