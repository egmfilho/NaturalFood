import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../services/utils.service';
import { User } from '../../models/user.model';
import { Address } from '../../models/address.model';
import { MapPage } from '../map/map';

/**
 * Generated class for the AddressConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-address-config',
	templateUrl: 'address-config.html',
})
export class AddressConfigPage {
	
	user: User;
	address: Address[];
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private utils: Utils) {
		this.user = new User(this.utils.globals.get(this.utils.constants.USER));
		this.utils.getHttp().post('address.php?action=getList', {
			person_id: this.user.personId
		}).subscribe(success => {
			this.address = success.data.map(a => new Address(a));
			console.log(this.address);
		}, error => {
			this.utils.alert('Erro', 'Erro ao obter os endereços. Tente novamente mais tarde', ['Ok']).present();
		});
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad AddressesPage');
	}
	
	addAddress() {
		this.navCtrl.push(MapPage);
	}
	
}
