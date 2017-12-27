import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Utils } from '../../services/utils.service';
import { HttpClient } from '@angular/common/http';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { EditAddressPage } from '../edit-address/edit-address';
import { Address } from '../../models/address.model';


/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-map',
	templateUrl: 'map.html',
})
export class MapPage {

	@ViewChild('mapCanvas') 
	mapElement: ElementRef;

	map: GoogleMap;
	mapReady: boolean;

	address: Address;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private statusBar: StatusBar, private modalCtrl: ModalController, private utils: Utils) {
		this.address = new Address({});

		if (!!this.navParams.data.address) {
			this.address = new Address(this.navParams.data.address);
			this.selectLocation();
		}

		this.mapReady = false;
	}
	
	ionViewDidLoad() {
		if (this.utils.platform.is('iOS')) {
			this.statusBar.overlaysWebView(true);
			this.statusBar.styleDefault();
		}
		this.loadMap();
	}

	ionViewWillLeave() {
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString('#162f0a');
	}

	loadMap() {
		let mapOptions: GoogleMapOptions = {
			camera: {
				target: {
					lat: -22.424082, 
					lng: -42.974951
				},
				zoom: 18
			}
		};

		this.map = GoogleMaps.create(this.mapElement.nativeElement, mapOptions);
		this.map.one(GoogleMapsEvent.MAP_READY)
			.then(() => {
				this.mapReady = true;
				this.utils.alert('Aviso', 'Mapa carregado', ['Ok']);

				if (this.address.lat == 0 && this.address.lng == 0) {
					this.goToDeviceLocation();
				} else {
					this.map.setCameraTarget({ lat: this.address.lat, lng: this.address.lng });	
				}
			});

		this.map.on(GoogleMapsEvent.MAP_DRAG_END)
			.subscribe(data => {
				var coords = this.map.getCameraPosition().target;
				this.address.lat = coords.lat;
				this.address.lng = coords.lng;
				this.getGoogleInfo(coords.lat, coords.lng);
			});
	}

	getLocality() {
		return this.address;
	}

	getGoogleInfo(lat, lng) {
		lat = lat.toFixed(7);
		lng = lng.toFixed(7);
		var key = 'AIzaSyB9peoZimBXaQMbspRIf2g5TlU9uhLvUUo';
		var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;

		let loading = this.utils.loading('');
		loading.present();

		this.http.get(url).subscribe(res => {
			var results: Array<any> = res['results'];

			if (results.length) {
				var components: Array<any> = results[0]['address_components'];

				components.forEach(c => {
					if (c.types.find(t => t == 'route')) {
						this.address.publicPlace = c.long_name;
					} else if (c.types.find(t => t == 'postal_code')) { 
						this.address.cep = c.long_name;
					} else if (c.types.find(t => t == 'sublocality_level_1')) {
						this.address.district.name = c.long_name;
					} else if (c.types.find(t => t == 'administrative_area_level_2')) {
						this.address.district.city.name = c.long_name;
					} else if (c.types.find(t => t == 'administrative_area_level_1')) {
						this.address.district.city.uf.name = c.long_name;
					}
				});

			} else {
				console.log('### NENHUM ENDEREÇO ENCONTRADO');
				this.address = new Address({});
			}
			loading.dismiss();
		}, err => {
			loading.dismiss();
			this.utils.alert('Erro', 'Erro ao obter informações do endereço', ['Ok']).present();
		});
	}

	goToDeviceLocation() {
		if (this.mapReady) {
			this.map.getMyLocation()
				.then(location => {
					console.log(JSON.stringify(location));
					this.map.setCameraTarget(location.latLng);
					this.getGoogleInfo(location.latLng.lat, location.latLng.lng);
				}, err => {
					console.log('### NAO FOI POSSIVEL DETECTAR A LOCALIZACAO ATUAL DO DISPOSITIVO');
				});
		}
	}

	selectLocation() {
		var modal = this.modalCtrl.create(EditAddressPage, {
			address: this.address
		});

		modal.present();
		modal.onDidDismiss(data => {
			if (data) {
				this.navCtrl.pop();
			}
		});
	}
	
}
