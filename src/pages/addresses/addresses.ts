import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../services/utils.service';
import { MapPage } from '../map/map';

/**
 * Generated class for the AddressesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-addresses',
	templateUrl: 'addresses.html',
})
export class AddressesPage {
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private utils: Utils) {
		console.log(this.utils.globals.get(this.utils.constants.USER));
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad AddressesPage');
	}
	
	addAddress() {
		this.navCtrl.push(MapPage);
	}
}
