import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Utils } from '../../services/utils.service';
import { HttpClient } from '@angular/common/http';


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

	route: string;
	district: string;
	city: string;
	state: string;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private utils: Utils) {
		this.mapReady = false;

		console.log(JSON.stringify(GoogleMaps.getPluginInstallName()));
	}
	
	ionViewDidLoad() {
		this.loadMap();
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

		console.log(' ### CRIANDO MAPA');
		this.map = GoogleMaps.create(this.mapElement.nativeElement, mapOptions);
		console.log(' ### MAPA CRIADO MAS AINDA NAO CARREGADO');
		this.map.one(GoogleMapsEvent.MAP_READY)
			.then(() => {
				console.log(' ### MAPA CARREGADO');
				this.mapReady = true;
				this.utils.alert('Aviso', 'Mapa carregado', ['Ok']);

				this.map.setMyLocationEnabled(true);
				this.map.getMyLocation()
					.then(location => {
						this.map.moveCamera(location);
						this.getGoogleInfo(location.latLng.lat, location.latLng.lng);
					}, err => {
						console.log('### NAO FOI POSSIVEL DETECTAR A LOCALIZACAO ATUAL DO DISPOSITIVO');
					});
			});

		this.map.on(GoogleMapsEvent.MAP_DRAG_END)
			.subscribe(data => {
				var coords = this.map.getCameraPosition().target;
				this.getGoogleInfo(coords.lat, coords.lng);
			});
	}

	getLocality() {
		return {
			lat: this.mapReady ? this.map.getCameraPosition().target.lat : 0,
			lng: this.mapReady ? this.map.getCameraPosition().target.lng : 0,
			route: this.route,
			district: this.district,
			city: this.city,
			state: this.state
		}
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
						this.route = c.long_name;
					} else if (c.types.find(t => t == 'sublocality_level_1')) {
						this.district = c.long_name;
					} else if (c.types.find(t => t == 'administrative_area_level_2')) {
						this.city = c.long_name;
					} else if (c.types.find(t => t == 'administrative_area_level_1')) {
						this.state = c.long_name;
					}
				});

				this.getCityDistricts(this.city);
			} else {
				console.log('### NENHUM ENDEREÇO ENCONTRADO');
				this.route = '';
			}
			loading.dismiss();
		}, err => {
			loading.dismiss();
			this.utils.alert('Erro', 'Erro ao obter informações do endereço', ['Ok']).present();
		});
	}
	

	getCityDistricts(cityName: string) {
		let loading = this.utils.loading('');

		this.utils.getHttp().post('district.php?action=getList', {
			city_name: cityName
		}).subscribe(success => {
			console.log(JSON.stringify(success.data));
		}, err => {
			this.utils.alert('Erro', 'Erro ao receber as paradas', ['Ok']).present();
		});
	}
	
}
