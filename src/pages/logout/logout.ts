import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Globals } from './../../services/globals.service';

/**
* Generated class for the LogoutPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
	selector: 'page-logout',
	templateUrl: 'logout.html',
})
export class LogoutPage {
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private globals: Globals) {
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad LogoutPage');
	}
	
}
