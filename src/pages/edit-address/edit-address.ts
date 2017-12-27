import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Utils } from '../../services/utils.service';
import { District } from '../../models/district.model';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Address } from '../../models/address.model';
import { User } from '../../models/user.model';

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
	
	user: User;
	addressForm: FormGroup;
	address: Address;
	districtArray: District[];

	constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private utils: Utils) {
		this.user = new User(this.utils.globals.get(this.utils.constants.USER));
		this.address = new Address(this.navParams.data.address);
		this.initForm();
		this.getCityDistricts(this.address.district.city.name);
	}
	
	ionViewDidLoad() {
		
	}

	initForm() {
		this.addressForm = new FormGroup({
			'address_id': new FormControl(this.address.id, []),
			'person_id': new FormControl(this.user.personId),
			'address_lat': new FormControl(this.address.lat),
			'address_lng': new FormControl(this.address.lng),
			'address_cep': new FormControl(this.address.cep, [
				Validators.required,
				Validators.pattern(/^[0-9]{5}-[0-9]{3}$/)
			]),
			'address_public_place': new FormControl(this.address.publicPlace, [
				Validators.required,
				Validators.minLength(3)
			]),
			'address_number': new FormControl(this.address.number, [
				Validators.required,
				Validators.minLength(1)
			]),
			'district_id': new FormControl(this.address.district.id, [
				Validators.required,
			]),
			'city': new FormControl(this.address.district.city.name, [ ]),
			'uf': new FormControl(this.address.district.city.uf.name, [ ])
		});
	}

	isValid() {
		return this.addressForm.valid;
	}

	getCityDistricts(cityName: string) {
		let loading = this.utils.loading('');
		loading.present();

		this.utils.getHttp().post('district.php?action=getList', {
			city_name: cityName
		}).subscribe(success => {
			this.districtArray = success.data.map(d => new District(d));
			var temp = this.districtArray.find(d => d.name == this.address.district.name);
			this.addressForm.controls['district_id'].setValue(temp ? temp.id : 1001);
			loading.dismiss();
		}, err => {
			console.log(JSON.stringify(err));
			loading.dismiss();
			this.utils.alert('Erro', 'Erro ao receber as informações de endereço', ['Ok']).present();
		});
	}

	onSubmit() {
		let loading = this.utils.loading('Enviando...');
		loading.present();

		var action = this.address.id ? 'edit' : 'insert';
		this.utils.getHttp().post(`address.php?action=${action}`, this.addressForm.value).subscribe(success => {
			loading.dismiss();
			this.dismiss(true);
		}, err => {
			loading.dismiss();
			this.utils.alert('Erro', 'Não foi possível salvar o endereço. Tente novamente mais tarde.', ['Ok']).present();
			console.clear();
			console.log(JSON.stringify(err));
		})
	}

	dismiss(data) {
		this.viewCtrl.dismiss(data);
	}
	
}
