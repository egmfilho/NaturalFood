import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';

import { Utils } from '../../services/utils.service';
import { ProfilePage } from '../profile/profile';
import { AboutPage } from '../about/about';
import { AgreementPage } from '../agreement/agreement';
import { User } from '../../models/user.model';
import { LoginPage } from '../login/login';
import { AddressConfigPage } from '../address-config/address-config';

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
	isNotificationOn: boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams, private popover: PopoverController, private alert: AlertController, private utils: Utils) {
		this.user =  new User(this.utils.globals.get(this.utils.constants.USER));
		this.utils.globals.getPersistent(this.utils.constants.RECEIVE_NOTIFICATIONS)
			.then(data => {
				this.isNotificationOn = !!data;
			});
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad PreferencesPage');
	}

	ionViewDidEnter() {
		this.user.imageUrl += '?x=' + this.utils.getRandom();
	}

	getAvatar() {
		return this.utils.globals.get(this.utils.constants.USER).imageData;
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

	changePassword() {
		this.alert.create({
			title: 'Troca de senha',
			inputs: [
				{
					name: 'old',
					placeholder: 'Senha antiga',
					type: 'password'
				}, 
				{
					name: 'new',
					placeholder: 'Nova senha',
					type: 'password'
				},
				{
					name: 'confirm',
					placeholder: 'Repita a nova senha',
					type: 'password'
				}
			],
			buttons: [
				{
					text: 'Enviar',
					handler: data => {
						if (!data.old || !data.new || !data.confirm) {
							return;
						}

						if (data.new !== data.confirm) {
							this.utils.alert('Erro', 'As senhas não conferem!', ['Ok']).present();
							return;
						}

						let loading = this.utils.loading('Enviando informações');
						loading.present();
						this.utils.getHttp().post('user.php?action=newPass', {
							user_id: this.user.id,
							user_pass: data.old,
							user_new_pass: data.new
						}).subscribe(success => {
							this.utils.globals.getPersistent(this.utils.constants.CREDENTIALS)
								.then(credentials => {
									this.utils.globals.setPersistent(this.utils.constants.CREDENTIALS, Object.assign(credentials, { password: data.new }));
									loading.dismiss();
									this.utils.alert('Successo', 'Senha alterada!', ['Ok']).present();
								});
						}, error => {
							loading.dismiss();
							this.utils.alert('Erro', error.error.status.description, ['Ok']).present();
						});
					}
				},
				{
					text: 'Cancelar',
					role: 'cancel'
				}
			]
		}).present();
	}

	toggleNotifications() {
		this.utils.globals.getPersistent(this.utils.constants.RECEIVE_NOTIFICATIONS)
			.then(data => {
				if (data) {
					var alert, buttons = [{
						text: 'Sim',
						handler: () => {
							this.utils.unsetPushNotification()
								.then(success => {
									this.isNotificationOn = false;
									this.utils.globals.setPersistent(this.utils.constants.RECEIVE_NOTIFICATIONS, this.isNotificationOn);
								}, error => {
									this.isNotificationOn = true;
									this.utils.alert('Erro', 'Não foi possível desativar as notificações. Tente novamente mais tarde.', ['Ok']).present()
								});
						}
					}, {
						text: 'Não',
						role: 'cancel',
						handler: () => {
							this.isNotificationOn = true;
						}
					}];

					alert = this.utils.alert('Aviso', 'Deseja parar de receber as notificações do Natural Food?', buttons);
					alert.onDidDismiss((data, role) => {
						if (role == 'backdrop')
							this.isNotificationOn = true; 
					});
					alert.present();
				} else {
					this.utils.setPushNotification();
					this.isNotificationOn = true;
					this.utils.globals.setPersistent(this.utils.constants.RECEIVE_NOTIFICATIONS, this.isNotificationOn);
				}
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

		this.utils.getHttp().post('logout.php', {
			user_device_id: this.utils.globals.getInternal('registrationId')
		}).subscribe(s => {
			loading.dismiss();
			this.utils.unsetPushNotification();
			this.utils.globals.removeInternal(this.utils.constants.TOKEN);
			this.utils.globals.setPersistent(this.utils.constants.RECEIVE_NOTIFICATIONS, true);
			this.utils.globals.removePersistent(this.utils.constants.CREDENTIALS)
				.then(s => this.navCtrl.setRoot(LoginPage), 
					  e => this.navCtrl.setRoot(LoginPage));
		}, e => {
			loading.dismiss();
			console.log(e);
		});
	}

	showAddresses() {
		this.navCtrl.push(AddressConfigPage);
	}
	
}
