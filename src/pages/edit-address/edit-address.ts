import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Utils } from '../../services/utils.service';
import { District } from '../../models/district.model';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Address } from '../../models/address.model';

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
	address: Address;
	districtArray: District[];

	constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private utils: Utils) {
		this.address = new Address(this.navParams.data.address);
		this.initForm();
		this.getCityDistricts(this.address.district.city.name);
	}
	
	ionViewDidLoad() {
		
	}

	initForm() {
		this.addressForm = new FormGroup({
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

		this.utils.getHttp().post('address.php?action=insert', this.addressForm.value).subscribe(success => {
			loading.dismiss();
			this.dismiss({ success: true});
		}, err => {
			loading.dismiss();
			this.utils.alert('Erro', 'Não foi possível adicionar o endereço. Tente novamente mais tarde.', ['Ok']).present();
		})
	}

	dismiss(data) {
		this.viewCtrl.dismiss(data);
	}
	
}
