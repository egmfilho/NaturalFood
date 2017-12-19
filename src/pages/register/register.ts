import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';

import { Utils } from '../../services/utils.service';
import { LoginPage } from '../login/login';
import { AgreementPage } from '../agreement/agreement';

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

	registerForm: FormGroup;
	passwordMatch: string;
	agreement: boolean;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private popover: PopoverController, private utils: Utils) {
		this.agreement = false;
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad RegisterPage');
	}

	ngOnInit() {
		var doubleChecking = ((c: AbstractControl): { invalid : boolean } => {
			if (c.get('user_password').value !== c.get('user_confirm_password').value) {
				c.get('user_confirm_password').setErrors({ notEquivalent: true });
				return { invalid: true };
			}

			if (c.get('user_mail').value !== c.get('user_confirm_mail').value) {
				c.get('user_confirm_mail').setErrors({ notEquivalent: true });
				return { invalid: true };
			}
			
			return null;
		});

		this.registerForm = new FormGroup({
			'person_name': new FormControl('', [
				Validators.required,
				Validators.minLength(3)
			]),
			'person_cpf': new FormControl('', [
				Validators.required,
				Validators.minLength(3)
			]),
			'user_mail': new FormControl('', [
				Validators.required,
				Validators.email
			]),
			'user_confirm_mail': new FormControl('', [
				Validators.required,
				Validators.email
			]),
			'user_password': new FormControl('', [
				Validators.required,
				Validators.minLength(6)
			]),
			'user_confirm_password': new FormControl('', [
				Validators.required,
				Validators.minLength(6)
			]),
			'user_ddd': new FormControl('', [
				Validators.required,
				Validators.pattern(/^[1-9]{2}$/)
			]),
			'user_tel': new FormControl('', [
				Validators.required,
				Validators.pattern(/^[2-9][0-9]{7,8}$/)
			]),
			'agreement': new FormControl(false, [
				Validators.requiredTrue
			])
		}, doubleChecking);
	}

	openAgreement(event: MouseEvent) {
		event.stopPropagation();

		this.getAgreement();
	}

	isValid() {
		return this.registerForm.valid;
	}

	onSubmit() {
		let loading = this.utils.loading('Enviando registro');
		loading.present();

		this.utils.getHttp().post('register.php?action=register', this.registerForm.value).subscribe(success => {
			loading.dismiss();
			this.utils.alert('Sucesso', 'Seu pré-cadastro foi enviado para análise. Em breve entraremos em contato.', ['Ok'])
				.present()
				.then(res => this.navCtrl.setRoot(LoginPage));
		}, error => {
			loading.dismiss();
			this.utils.alert('Erro', 'Não foi possível realizar o registro. Tente novamente mais tarde.', ['OK']).present();
		});
	}

	getAgreement() {
		let loading = this.utils.loading('Carregando');
		loading.present();

		this.utils.getHttp().get('register.php?action=agreement').subscribe(success => {
			loading.dismiss();
			this.popover.create(AgreementPage, { 
				title: success.data.text.text_title,
				text: success.data.text.text_text 
			}, {
				showBackdrop: true,
				enableBackdropDismiss: true
			}).present();
		}, error => {
			loading.dismiss();
			this.utils.alert('Erro', this.utils.globals.getInternal('errorMessage'), ['OK']).present();
		});
	}
	
}
