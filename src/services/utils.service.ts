import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from 'ionic-angular';

import { Globals } from './globals.service';
import { Response } from '../models/server-response.model';

@Injectable()
export class Utils {

	constructor(private http: HttpClient, private loadingCtrl: LoadingController, private alertCtrl: AlertController, public globals: Globals) { }

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

	alert(title: string, message: string, buttons: string[]) {
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

}