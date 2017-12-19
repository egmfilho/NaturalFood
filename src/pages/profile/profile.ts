import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { Utils } from './../../services/utils.service';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { User } from '../../models/user.model';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {
	
	@ViewChild(Content) content: Content;
	
	headerRGBA: string;
	user: any;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private changeDetector: ChangeDetectorRef, private actionSheet: ActionSheetController, private camera: Camera, private utils: Utils) {
		this.user = new User(this.utils.globals.get('user'));
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad EditProfilePage');
	}

	ngAfterViewInit() {
        this.content.ionScroll.subscribe(data => {
			var alpha = Math.min(1, data['scrollTop'] / 130.0) || 0;
			this.headerRGBA = `rgba(30, 63, 13, ${alpha})`;
			this.changeDetector.detectChanges();
		});
	}

	getAvatar() {
		var avatar = this.user.imageUrl || 'assets/images/no-pic.png';

		return `url(${avatar})`;
	}

	editProfile() {
		this.navCtrl.push(EditProfilePage);
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
			this.sendPicture(imageData).subscribe(success => {
				console.log(success);
				this.utils.globals.get('user').imageUrl = success.data.image_uri;
				loading.dismiss();
			}, error => {
				console.log(error);
				loading.dismiss();
				this.utils.alert('Erro', error.error.description, ['Ok']).present();
			});
		}, err => {
			loading.dismiss();
			this.utils.alert('Erro', 'Não foi possível carregar a imagem.', ['OK']).present();
		});
	}

	sendPicture(data: string) {
		return this.utils.getHttp().post('user.php?action=avatar', {
			user_avatar: data
		});
	}
	
}
