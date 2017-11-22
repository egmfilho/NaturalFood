import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';

import { Utils } from '../../services/utils.service';
import { LoginPage } from '../login/login';
import { AgreementPage } from '../agreement/agreement';
import { Person } from '../../models/person.model';

/**
* Generated class for the RegisterPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
	selector: 'page-register',
	templateUrl: 'register.html',
})
export class RegisterPage {

	person: Person;
	registerForm: FormGroup;
	passwordMatch: string;
	agreement: boolean;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private popover: PopoverController, private utils: Utils) {
		this.person = new Person({});
		this.agreement = false;
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad RegisterPage');
	}

	ngOnInit() {
		var passwordConfirming = ((c: AbstractControl): { invalid : boolean } => {
			if (c.get('person_password').value !== c.get('person_confirm_password').value) {
				c.get('person_confirm_password').setErrors({ notEquivalent: true });
				return { invalid: true };
			}
			
			return null;
		});

		this.registerForm = new FormGroup({
			'person_name': new FormControl(this.person.name, [
				Validators.required,
				Validators.minLength(3)
			]),
			'person_last_name': new FormControl(this.person.lastName, [
				Validators.required,
				Validators.minLength(3)
			]),
			'person_mail': new FormControl(this.person.email, [
				Validators.required,
				Validators.email
			]),
			'person_password': new FormControl(this.person.password, [
				Validators.required,
				Validators.minLength(6)
			]),
			'person_confirm_password': new FormControl(this.passwordMatch, [
				Validators.required,
				Validators.minLength(6)
			]),
			'person_ddd': new FormControl(this.person.ddd, [
				Validators.required,
				Validators.pattern(/^[1-9]{2}$/)
			]),
			'person_tel': new FormControl(this.person.tel, [
				Validators.required,
				Validators.pattern(/^[2-9][0-9]{7,8}$/)
			]),
			'agreement': new FormControl(this.agreement, [
				Validators.requiredTrue
			])
		}, passwordConfirming);
	}

	openAgreement(event: MouseEvent) {
		event.stopPropagation();
		
		this.popover.create(AgreementPage, { }, {
			showBackdrop: true,
			enableBackdropDismiss: true
		}).present();
	}

	isValid() {
		return this.registerForm.valid;
	}

	onSubmit() {
		let loading = this.utils.loading('Enviando registro');
		loading.present();

		this.utils.getHttp().post('register.php', this.registerForm.value).subscribe(success => {
			loading.dismiss();
			this.navCtrl.setRoot(LoginPage);
		}, error => {
			loading.dismiss();
			this.utils.alert('Erro', 'Não foi possível realizar o registro. Tente novamente mais tarde.', ['OK']).present();
		});
	}
	
}
