import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { Camera } from '@ionic-native/camera';

import { Utils } from './../../services/utils.service';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-edit-profile',
	templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheet: ActionSheetController, private camera: Camera, private utils: Utils) {
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad EditProfilePage');
	}

	selectFromSource() {
		let actionSheet = this.actionSheet.create({
			title: 'Selecionar uma foto',
			buttons: [{
				text: 'Tirar foto',
				handler: () => {
					this.takePicture(this.camera.PictureSourceType.CAMERA);
				}
			},{
				text: 'Escolher da biblioteca',
				handler: () => {
					this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
				}
			}, {
				text: 'Cancelar',
				role: 'cancel'
			}]
		});

		actionSheet.present();
	}

	teste: string;

	takePicture(sourceType: number) {
		var options = {
			quality: 70,
			sourceType: sourceType,
			destinationType : this.camera.DestinationType.DATA_URL,
			saveToPhotoAlbum: false,
			correctOrientation: true,
			cameraDirection: this.camera.Direction.FRONT,
			targetWidth: 500,
			targetHeight: 500
		};

		let loading = this.utils.loading('Carregando');

		loading.present();
		this.camera.getPicture(options).then(imageData => {
			this.utils.globals.get('user').avatar = 'data:image/jpeg;base64,' + imageData;
			this.teste = 'data:image/jpeg;base64,' + imageData;
			loading.dismiss();
		}, err => {
			loading.dismiss();
			this.utils.alert('Erro', 'Não foi possível carregar a imagem.', ['OK']).present();
		});
	}
	
}
