import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Utils } from '../../services/utils.service';
import { District } from '../../models/district.model';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the EditAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-edit-address',
	templateUrl: 'edit-address.html',
})
export class EditAddressPage {
	
	addressForm: FormGroup;

	lat: number;
	lng: number;
	cep: string;
	route: string;
	district: string;
	city: string;
	state: string;

	districtArray: District[];

	constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private utils: Utils) {
		this.lat = navParams.data.lat;
		this.lng = navParams.data.lng;
		this.cep = navParams.data.cep;
		this.route = navParams.data.route;
		this.district = navParams.data.district;
		this.city = navParams.data.city;
		this.state = navParams.data.state;
		this.initForm();
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad EditAddressPage');
	}

	initForm() {
		this.addressForm = new FormGroup({
			'address_cep': new FormControl(this.cep, [
				Validators.required,
				Validators.minLength(3)
			]),
			'address_public_place': new FormControl(this.route, [
				Validators.required,
				Validators.minLength(3)
			]),
			'address_number': new FormControl('', [
				Validators.required,
				Validators.minLength(3)
			]),
			'district': new FormControl('', [
				Validators.required,
			]),
			'city': new FormControl(this.city, [
				Validators.required
			]),
			'uf': new FormControl(this.state, [
				Validators.required
			])
		});
	}

	isValid() {

	}

	getCityDistricts(cityName: string) {
		let loading = this.utils.loading('');
		loading.present();

		this.utils.getHttp().post('district.php?action=getList', {
			city_name: cityName
		}).subscribe(success => {
			console.log(JSON.stringify(success.data));
			this.districtArray = success.data.map(d => new District(d));
			console.log(this.districtArray);
			loading.dismiss();
		}, err => {
			loading.dismiss();
			this.utils.alert('Erro', 'Erro ao receber as paradas', ['Ok']).present();
		});
	}

	dismiss(address) {
		this.viewCtrl.dismiss(address);
	}
	
}
