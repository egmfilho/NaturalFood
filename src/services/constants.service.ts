/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-12-19 10:15:51 
 * @Last Modified by: egmfilho
 * @Last Modified time: 2017-12-19 10:32:54
*/

import { Injectable } from "@angular/core";

@Injectable()
export class Constants {
	public RECEIVE_NOTIFICATIONS: string = 'receive-notifications';
	public SKIP_INTRO: string = 'skip-intro';
	public CREDENTIALS: string = 'credentials';
	public TOKEN: string = 'token';
	public USER: string = 'user';
	public ERROR_MESSAGE: string = 'errorMessage';
	public BASE64_AVATAR: string = 'base64-Avatar';
}