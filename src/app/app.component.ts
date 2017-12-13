import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Globals } from './../services/globals.service';

import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
// import { HomePage } from '../pages/home/home';
import { FoodListPage } from '../pages/food-list/food-list';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';
import { PreferencesPage } from '../pages/preferences/preferences';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	
	rootPage: any;
	
	pages: Array<{title: string, component: any}>;

	userPic: string;
	
	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private globals: Globals) {
		this.initializeApp();
		
		// used for an example of ngFor and navigation
		this.pages = [
			// { title: 'Home', component: HomePage },
			{ title: 'Início', component: FoodListPage },
			{ title: 'Pedidos anteriores', component: ListPage },
			{ title: 'Preferências', component: PreferencesPage }
		];
	}
	
	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleLightContent();//.styleDefault();

			// Alterar a chave aqui para forçar a exibição da introdução
			this.globals.getPersistent('credentials').then(res => {
				if (res) {
					this.rootPage = LoginPage;
				} else {
					this.rootPage = IntroPage;
				}

				this.splashScreen.hide();
			}, err => {
				this.rootPage = IntroPage;
				this.splashScreen.hide();
			});
		});
	}
	
	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}

	openProfilePage() {
		this.nav.push(ProfilePage);
	}

	getUser() {
		return this.globals.get('user');
	}
}
