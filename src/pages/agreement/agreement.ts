import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the AgreementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-agreement',
	templateUrl: 'agreement.html',
})
export class AgreementPage {
	
	constructor(public viewCtrl: ViewController) {
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad AgreementPage');
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
	
}
