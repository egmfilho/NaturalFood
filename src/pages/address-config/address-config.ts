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
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad AddressesPage');
	}

	ionViewDidEnter() {
		this.loadAddresses();
	}

	loadAddresses() {
		let loading = this.utils.loading('Carregando');
		loading.present();
		this.utils.getHttp().post('address.php?action=getList', {
			person_id: this.user.personId
		}).subscribe(success => {
			this.address = success.data.map(a => new Address(a));
			console.log(this.address);
			loading.dismiss();
		}, error => {
			loading.dismiss();
			this.utils.alert('Erro', 'Erro ao obter os endereços. Tente novamente mais tarde', ['Ok']).present();
		});
	}
	
	addAddress() {
		this.navCtrl.push(MapPage);
	}

	removeAddress(address: Address) {
		let loading = this.utils.loading('');
		loading.present();

		this.utils.getHttp().post('address.php?action=del', {

		}).subscribe(success => {
			loading.dismiss();
			this.loadAddresses();
		}, err => {
			loading.dismiss();
			this.utils.alert('Erro', 'Não foi possível remover o endereço. Tente novamente mais tarde.', ['Ok']).present();
		});
	}

	editAddress(address: Address) {
		this.navCtrl.push(MapPage, {
			address: address
		});
	}
	
}
