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

	agreement: string;
	title: string;
	
	constructor(public viewCtrl: ViewController) {
		this.agreement = this.viewCtrl.data.text;
		this.title = this.viewCtrl.data.title;
	}

	ionViewDidLoad() {

	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
	
}
