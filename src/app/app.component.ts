import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Utils } from '../services/utils.service';

import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { AutoLoginPage } from '../pages/auto-login/auto-login';
// import { HomePage } from '../pages/home/home';
import { FoodListPage } from '../pages/food-list/food-list';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';
import { PreferencesPage } from '../pages/preferences/preferences';
import { User } from '../models/user.model';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	
	rootPage: any;
	
	pages: Array<{title: string, component: any}>;

	user: User;
	
	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private utils: Utils) {
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
			this.statusBar.styleLightContent();
			this.statusBar.backgroundColorByHexString('#162f0a');

			// this.utils.globals.setInternal('api', prompt('API', this.utils.globals.getInternal('api')));

			// Alterar a chave aqui para forçar a exibição da introdução
			this.utils.globals.getPersistent(this.utils.constants.SKIP_INTRO).then(res => {
				if (res) {
					this.utils.globals.getPersistent(this.utils.constants.CREDENTIALS).then(credentials => {
						if (credentials) {
							this.rootPage = AutoLoginPage;
						} else {
							this.rootPage = LoginPage;
						}
					});
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
		if (!this.user) {
			var u = new User(this.utils.globals.get(this.utils.constants.USER));
			if (u && u.id) this.user = u;
		}

		return this.user;
	}
}
