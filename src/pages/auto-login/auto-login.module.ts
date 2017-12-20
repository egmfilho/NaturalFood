import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutoLoginPage } from './auto-login';

@NgModule({
  declarations: [
    AutoLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(AutoLoginPage),
  ],
})
export class AutoLoginPageModule {}
