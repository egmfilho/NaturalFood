import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-intro',
	templateUrl: 'intro.html',
})
export class IntroPage {

	slides: any[];
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController) {
		this.slides = [{
			image: 'url(\'../assets/images/intro-legumes.png\')',
			title: 'Lorem Ipsum',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis justo mollis maximus placerat.'
		}, {
			image: 'url(\'../assets/images/intro-dinheiro.png\')',
			title: 'Proin tellus magna',
			description: 'Phasellus hendrerit, leo sed pellentesque tristique, sem leo varius magna, finibus consectetur sapien mauris eget nisi. Aliquam ornare massa libero, vitae lacinia sem accumsan vel.'
		}, {
			image: 'url(\'../assets/images/intro-logistica.png\')',
			title: 'Maecenas viverra',
			description: 'Cras laoreet tellus quis nulla volutpat efficitur. Ut in volutpat velit. Maecenas leo enim, porta hendrerit libero in, feugiat dapibus velit. Morbi turpis erat, aliquet quis lectus in, bibendum semper sapien.'
		}]
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad IntroPage');
	}

	skip() {
		this.navCtrl.setRoot(LoginPage);
	}

	register() {
		this.navCtrl.insert(0, LoginPage);
		this.navCtrl.push(RegisterPage).then(res => {
			this.navCtrl.removeView(this.viewController);
		});
	}
	
}
