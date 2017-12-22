import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressConfigPage } from './address-config';

@NgModule({
  declarations: [
    AddressConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressConfigPage),
  ],
})
export class AddressConfigPageModule {}
