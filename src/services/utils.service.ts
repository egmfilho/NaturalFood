import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { Push, PushObject } from '@ionic-native/push';

import { Globals } from './globals.service';
import { Response } from '../models/server-response.model';
import { Constants } from './constants.service';

@Injectable()
export class Utils {

	private pushNotification: PushObject;

	constructor(public platform: Platform, private http: HttpClient, private loadingCtrl: LoadingController, private push: Push, private alertCtrl: AlertController, public globals: Globals, public constants: Constants) { }

	getHttp() {
		let address = this.globals.getInternal('api'),
			scope = this;

		function get(endpoint: string) {
			return scope.http.get<Response>(address + endpoint);
		}

		function post(endpoint: string, data: any) {
			return scope.http.post<Response>(address + endpoint, data);
		}

		return {
			get: get,
			post: post
		};
	}

	alert(title: string, message: string, buttons: any[]) {
		return this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: buttons
		});
	}

	loading(text: string) {
		return this.loadingCtrl.create({
			content: text
		});
	}

	/**
	 * Registra o dispositivo para receber notificacoes push.
	 * Lembrar de remover o dispositivo ao fazer logout.
	 */
	setPushNotification() {
		if (this.platform.is('cordova')) {
			// https://console.firebase.google.com

			/**
			 * POST
			 *
			 * URL
			 * https://fcm.googleapis.com/fcm/send
			 * 
			 * HEADER
			 * Content-Type:application/json
			 * Authorization:key=AAAAMmuVIfU:APA91bGXe55IjlrVBnOmpdOZgn4v0kiDMXgsgu0qvDrrs7PAim6N2mmaLN9LxzbpRisaXzkrPCoxEh5OQHdmOeIBjHfubH27n7U-eXy4QL05gC0_lPH4Szs0d2vSEAHI7TGtnTA1kCra
			 * 
			 * BODY 
			 * {
			 *		"notification": {
			 *			"title": "Teste post",
			 *			"body": "Nem sei se isso aqui chega a aparecer"
			 *		},
			 *		"to": "cOaFSBYGvy4:APA91bGYtxFbJ5j2jg08g_1bjCcsVciHGF40uoCUczHU9x8_LhwPdPeUVbXeYAiwjkVlfTtSm-GPAAO2a46hqvHFRhDVHWQIoyG6PhSSPffJVqSq1KOB5YGsi9_tzhzz6KPWVMLyisiX"
			 *	}
			 * 
			 * 
			 * 
			 */

			this.push.hasPermission()
				.then((res: any) => {
					if (res.isEnabled) {
						this.pushNotification = this.push.init({
							android: { 
								senderID: '216553300469',
								sound: true,
								vibrate: true
							},
							ios: {
								// https://medium.com/@felipeevangelistapucinelli/how-to-add-push-notifications-in-your-cordova-application-using-firebase-69fac067e821
								alert: "true",
								badge: "true",
								sound: "true"
							}
						});
						
						this.pushNotification.subscribe('Natural');
						
						this.pushNotification.on('registration').subscribe(data => {
							var id = data.registrationId;
							this.globals.setInternal('registrationId', id);
			
							this.getHttp().post('user.php?action=registerDevice', {
								user_device_id: id
							});
			
							// prompt('Registration ID', id);
						});		
					} else {
						this.alert('Permissão de notificações', 'A permissão para o recebimento de notificações está desativada. Ative-a nos ajustes do aparelho para receber notificações e alertas do Natural Food.', ['ok']).present();
					}

				});
		}
	}

	unsetPushNotification() {
		if (this.platform.is('cordova') && !!this.pushNotification) {
			return this.pushNotification.unregister();
		}

		return null;
	}

	getRandom() {
		return Math.random();
	}

	imageUrlToUri(imageUrl: string) {
		return new Promise<string>((resolve, reject) => {
			if (!imageUrl) resolve('');

			var http = new XMLHttpRequest();
			http.open('GET', imageUrl, true);
			http.responseType = 'arraybuffer';
			http.onload = function(e) {
				var arr = new Uint8Array(http.response);
				var raw = String.fromCharCode.apply(null, arr);
				var b64 = window.btoa(raw);
				resolve('data:image/png;base64,' + b64);
			};
			http.send();
		});
	}
	  
}