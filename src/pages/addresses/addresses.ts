import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../services/utils.service';
import { MapPage } from '../map/map';
import { Address } from '../../models/address.model';
import { User } from '../../models/user.model';
import { ViewController } from 'ionic-angular/navigation/view-controller';

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

	user: User;
	address: Address[];
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private utils: Utils) {
		this.user = new User(this.utils.globals.get(this.utils.constants.USER));

		this.loadAddresses();
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad AddressesPage');
	}

	loadAddresses() {
		let loading = this.utils.loading('Carregando endereços');
		loading.present();

		this.utils.getHttp().post('address.php?action=getList', {
			person_id: this.user.personId
		}).subscribe(success => {
			this.address = success.data.map(a => new Address(a));
			loading.dismiss();
		}, error => {
			loading.dismiss();
			this.utils.alert('Erro', 'Erro ao obter os endereços. Tente novamente mais tarde', ['Ok']).present();
		});
	}
	
	addAddress() {
		this.navCtrl.push(MapPage);
	}

	dismiss(address) {
		this.viewCtrl.dismiss(address);
	}
}
