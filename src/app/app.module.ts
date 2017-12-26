import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { Push } from '@ionic-native/push';
import { GoogleMaps } from '@ionic-native/google-maps';

import { Interceptor } from './../services/interceptor.service';

import { MyApp } from './app.component';
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { AutoLoginPage } from '../pages/auto-login/auto-login';
import { RegisterPage } from './../pages/register/register';
import { HomePage } from '../pages/home/home';
import { FoodListPage } from '../pages/food-list/food-list';
import { ListPage } from '../pages/list/list';
import { OrderItemsPage } from '../pages/order-items/order-items';
import { ProfilePage } from '../pages/profile/profile';
import { EditProfilePage } from './../pages/edit-profile/edit-profile';
import { PreferencesPage } from '../pages/preferences/preferences';
import { LogoutPage } from './../pages/logout/logout';
import { AgreementPage } from '../pages/agreement/agreement';
import { AddressesPage } from '../pages/addresses/addresses';
import { AboutPage } from '../pages/about/about';
import { MapPage } from '../pages/map/map';
import { OrderSummaryPage } from '../pages/order-summary/order-summary';
import { EditAddressPage } from '../pages/edit-address/edit-address';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CategoryCardComponent } from './../components/category-card/category-card';
import { BasketComponent } from './../components/basket/basket';
import { FoodCardComponent } from '../components/food-card/food-card';

import { Constants } from '../services/constants.service';
import { Globals } from './../services/globals.service';
import { Utils } from './../services/utils.service';
import { BasketService } from './../services/basket.service';
import { FoodFilterPipe } from '../pipes/food-filter.pipe';
import { InputMaskDirective } from '../directives/input-mask.directive';
import { AddressConfigPage } from '../pages/address-config/address-config';

@NgModule({
	declarations: [
		MyApp,
		IntroPage,
		LoginPage,
		AutoLoginPage,
		RegisterPage,
		HomePage,
		FoodListPage,
		ListPage,
		OrderItemsPage,
		ProfilePage,
		EditProfilePage,
		PreferencesPage,
		LogoutPage,
		AgreementPage,
		EditAddressPage,
		AboutPage,
		OrderSummaryPage,
		MapPage,
		AddressesPage,
		AddressConfigPage,
		CategoryCardComponent,
		FoodCardComponent,
		BasketComponent,
		FoodFilterPipe,
		InputMaskDirective
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		IonicModule.forRoot(MyApp, {
			platforms: {
				ios: {
					backButtonText: 'Voltar',
				}
			}
		}),
		IonicStorageModule.forRoot({
			name: 'appdb'
		})
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		IntroPage,
		LoginPage,
		AutoLoginPage,
		RegisterPage,
		HomePage,
		FoodListPage,
		ListPage,
		OrderItemsPage,
		ProfilePage,
		EditProfilePage,
		PreferencesPage,
		LogoutPage,
		AgreementPage,
		AddressesPage,
		AddressConfigPage,
		EditAddressPage,
		AboutPage,
		OrderSummaryPage,
		MapPage,
		CategoryCardComponent,
		FoodCardComponent,
		BasketComponent
	],
	providers: [
		StatusBar,
		SplashScreen,
		Camera,
		FingerprintAIO,
		Push,
		GoogleMaps,
		Constants,
		Globals,
		Utils,
		BasketService,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
	]
})
export class AppModule {}
