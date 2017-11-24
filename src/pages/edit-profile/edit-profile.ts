import { Component } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

	constructor(public navCtrl: NavController, public navParams: NavParams) {

	}
	
	ionViewDidLoad() {

	}

	ngOnInit() {
		var passwordConfirming = ((c: AbstractControl): { invalid : boolean } => {
			if (c.get('user_password').value !== c.get('user_confirm_password').value) {
				c.get('user_confirm_password').setErrors({ notEquivalent: true });
				return { invalid: true };
			}
			
			return null;
		});

		this.editForm = new FormGroup({
			'user_name': new FormControl('', [
				Validators.required,
				Validators.minLength(3)
			]),
			'user_cpf': new FormControl('', [
				Validators.required,
				Validators.pattern(/^[0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[\-][0-9]{2}$/)
			]),
			'user_mail': new FormControl('', [
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
			])
		}, passwordConfirming);
	}
}
