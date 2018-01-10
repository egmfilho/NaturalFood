import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from '../../services/utils.service';
import { LoginPage } from '../login/login';
import { User } from '../../models/user.model';
import { FoodListPage } from '../food-list/food-list';

/**
 * Generated class for the AutoLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-auto-login',
	templateUrl: 'auto-login.html',
})
export class AutoLoginPage {
	
	avatar: string;
	name: string;
	username: string;
	password: string;
	isLoading: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar: StatusBar, private utils: Utils) {
		this.avatar = 'url(\'assets/images/no-pic.png\')';

		this.utils.globals.getPersistent(this.utils.constants.CREDENTIALS)
			.then(credentials => {
				if (credentials) {
					this.avatar = credentials.avatar ? `url(${credentials.avatar})` : 'url(\'assets/images/no-pic.png\')';;
					this.name = credentials.name;
					this.username = credentials.username;
					this.password = credentials.password;
					this.login(this.username, this.password);
				} else {
					this.useAnoterAccount();
				}
			});
	}
	
	ionViewDidLoad() {
		this.statusBar.overlaysWebView(true);
	}

	useAnoterAccount() {
		this.utils.globals.removePersistent(this.utils.constants.CREDENTIALS)
			this.navCtrl.setRoot(LoginPage);
	}

	login(username, password) {
		let loading = this.utils.loading('Efetuando login');
		loading.present();
		
		this.isLoading = true;
		this.utils.getHttp().post('login.php', {
			user_user: username,
			user_pass: password
		}).subscribe(success => {
			// console.log(JSON.stringify(success.data));
			this.utils.globals.getPersistent(this.utils.constants.RECEIVE_NOTIFICATIONS).then(res => {
				if (!!res) this.utils.setPushNotification();
			});

			var user = new User(success.data);
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

				case 401:
				case 404: {
					title = 'Aviso';
					msg = 'Usuário ou senha incorretos.';
					this.utils.globals.removePersistent(this.utils.constants.CREDENTIALS);
					this.navCtrl.setRoot(LoginPage);
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
	
}
