import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Utils } from '../../services/utils.service';
import { User } from '../../models/user.model';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-edit-profile',
	templateUrl: 'edit-profile.html'
})
export class EditProfilePage {

	editForm: FormGroup;
	user: User;

	constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker, private utils: Utils) {
		this.user = new User(this.utils.globals.get('user'));
	}
	
	ionViewDidLoad() {

	}

	ngOnInit() {
		this.editForm = new FormGroup({
			'person_name': new FormControl(this.user.person.name, [
				Validators.required,
				Validators.minLength(3)
			]),
			'person_birth_br': new FormControl(this.user.person.birthDate.toLocaleDateString('pt-BR'), [
				Validators.required,
				Validators.minLength(3)
			]),
			'person_cpf': new FormControl(this.user.person.cpf, [
				Validators.required,
				Validators.pattern(/^[0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[\-][0-9]{2}$/)
			]),
			'person_rg': new FormControl(this.user.person.rg, [
				Validators.required,
				Validators.pattern(/^[0-9]{2}[\.][0-9]{3}[\.][0-9]{3}[\-][0-9]{2}$/)
			]),
			'person_gender': new FormControl(this.user.person.gender, [
				Validators.required
			])
		});
	}

	showDatePicker() {
		if (this.utils.platform.is('cordova')) {
			this.datePicker.show({
				mode: 'date',
				date: new Date(this.user.person.birthDate),
				allowFutureDates: false,
				okText: 'Selecionar',
				cancelText: 'Cancelar',
				doneButtonLabel: 'Selecionar',
				cancelButtonLabel: 'Cancelar',
				locale: 'pt-BR'
			}).then(date => {
				if (date) {
					this.editForm.controls['person_birth'].setValue(date.toLocaleDateString('pt-BR'));
					this.utils.alert('Teste', date.toLocaleDateString('pt-BR'), []).present();
				}
			});
		}
	}

	onSubmit() {
		let loading = this.utils.loading('Enviando informações');
		loading.present();

		this.utils.getHttp().post('teste.php?action=edit', this.editForm.value).subscribe(success => {
			loading.dismiss();
			this.utils.alert('Sucesso', 'Informações atualizadas!', ['Ok'])
				.present()
				.then(res => this.navCtrl.pop());
		}, error => {
			loading.dismiss();
			this.utils.alert('Erro', 'Não foi possível editar as informações. Tente novamente mais tarde.', ['OK']).present();
		});
	}
}
