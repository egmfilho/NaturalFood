import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';

import { Interceptor } from './../services/interceptor.service';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { HomePage } from '../pages/home/home';
import { FoodListPage } from '../pages/food-list/food-list';
import { ListPage } from '../pages/list/list';
import { OrderItemsPage } from '../pages/order-items/order-items';
import { EditProfilePage } from './../pages/edit-profile/edit-profile';
import { LogoutPage } from './../pages/logout/logout';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CategoryCardComponent } from './../components/category-card/category-card';
import { BasketComponent } from './../components/basket/basket';
import { FoodCardComponent } from '../components/food-card/food-card';

import { Globals } from './../services/globals.service';
import { Utils } from './../services/utils.service';
import { BasketService } from './../services/basket.service';

@NgModule({
	declarations: [
		MyApp,
		LoginPage,
		RegisterPage,
		HomePage,
		FoodListPage,
		ListPage,
		OrderItemsPage,
		EditProfilePage,
		LogoutPage,
		CategoryCardComponent,
		FoodCardComponent,
		BasketComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		LoginPage,
		RegisterPage,
		HomePage,
		FoodListPage,
		ListPage,
		OrderItemsPage,
		EditProfilePage,
		LogoutPage,
		CategoryCardComponent,
		FoodCardComponent,
		BasketComponent
	],
	providers: [
		StatusBar,
		SplashScreen,
		Camera,
		Globals,
		Utils,
		BasketService,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
	]
})
export class AppModule {}
