import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { Utils } from '../../services/utils.service';
import { ProfilePage } from '../profile/profile';
import { AboutPage } from '../about/about';
import { AgreementPage } from '../agreement/agreement';
import { User } from '../../models/user.model';
import { LoginPage } from '../login/login';

/**
 * Generated class for the PreferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-preferences',
	templateUrl: 'preferences.html',
})
export class PreferencesPage {
	
	user: User;

	constructor(public navCtrl: NavController, public navParams: NavParams, private popover: PopoverController, private utils: Utils) {
		this.user =  new User(this.utils.globals.get('user'));
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad PreferencesPage');
	}

	openAgreement() {
		let loading = this.utils.loading('Carregando');
		loading.present();

		this.utils.getHttp().get('register.php?action=agreement').subscribe(success => {
			loading.dismiss();
			this.popover.create(AgreementPage, { 
				title: success.data.text.text_title,
				text: success.data.text.text_text 
			}, {
				showBackdrop: true,
				enableBackdropDismiss: true
			}).present();
		}, error => {
			loading.dismiss();
			this.utils.alert('Erro', this.utils.globals.getInternal('errorMessage'), ['OK']).present();
		});
	}

	showVersion() {
		this.utils.alert('Versão', '1.0', ['OK']).present();
	}

	openProfile() {
		this.navCtrl.push(ProfilePage);
	}

	openAbout() {
		this.navCtrl.push(AboutPage);
	}

	logout() {
		let loading = this.utils.loading('Desconectando');
		loading.present();

		this.utils.getHttp().get('logout.php')
			.subscribe(s => {
				loading.dismiss();
				this.utils.globals.removePersistent('credentials')
					.then(s => this.navCtrl.setRoot(LoginPage), 
						  e => this.navCtrl.setRoot(LoginPage));
			}, e => {
				loading.dismiss();
				console.log(e);
			});
	}
	
}
