import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Utils } from '../../services/utils.service';


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
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private utils: Utils) {
		this.mapReady = false;
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
			});

		this.map.one(GoogleMapsEvent.CAMERA_MOVE_END)
			.then(data => {
				var coords = this.map.getCameraPosition().target;
				this.getGoogleInfo(coords.lat, coords.lng);
			});

		// this.map = GoogleMaps.create(document.getElementById('map_canvas'), mapOptions);

		// Wait the MAP_READY before using any methods.
		// this.map.one(GoogleMapsEvent.MAP_READY)
		// 	.then(() => {
		// 		console.log('Map is ready!');

		// 		//  Now you can use all methods safely.
		// 		this.map.addMarker({
		// 			title: 'Edu',
		// 			icon: 'green',
		// 			animation: 'DROP',
		// 			position: {
		// 				lat: -22.424031, 
		// 				lng: -42.9748269
		// 			}
		// 		}).then(marker => {
		// 			marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
		// 				alert('clicked');
		// 			});
		// 		});
		// 	});
	}

	getCoords() {
		return {
			lat: this.mapReady ? this.map.getCameraPosition().target.lat : 0,
			lng: this.mapReady ? this.map.getCameraPosition().target.lng : 0
		}
	}

	getGoogleInfo(lat, lng) {
		lat = lat.toFixed(7);
		lng = lng.toFixed(7);
		var url = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}`;

		this.http.get(url).subscribe(res => {
			var components = res['results'][0].address_components;

			components.forEach(element => {
				if (element.types.find(n => n == 'route') >= 0) {
					this.route = element.long_name;
				}
			});
		}, err => {
			// this.utils.alert('Erro', 'Erro ao obter informações do endereço', ['Ok']).present();
			prompt(url, JSON.stringify(err));
		});
	}
	
}
