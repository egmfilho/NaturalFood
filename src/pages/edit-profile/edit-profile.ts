import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

	constructor(public navCtrl: NavController, public navParams: NavParams, private utils: Utils) {
		this.user = new User(this.utils.globals.get(this.utils.constants.USER));
	}
	
	ionViewDidLoad() {

	}

	ngOnInit() {
		this.editForm = new FormGroup({
			'person_name': new FormControl(this.user.person.name, [
				Validators.required,
				Validators.minLength(3)
			]),
			'person_birth': new FormControl(this.user.person.birthDate.toISOString(), [
				Validators.required
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

	onSubmit() {
		let loading = this.utils.loading('Enviando informações');
		loading.present();

		var formData = Object.assign({}, this.editForm.value, {
			person_id: this.user.person.id
		});

		this.utils.getHttp().post('person.php?action=edit', formData).subscribe(success => {
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
