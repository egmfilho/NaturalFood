/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-11-09 17:23:23 
 * @Last Modified by: egmfilho
 * @Last Modified time: 2017-11-09 17:49:17
 */

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/observable';

import { Globals } from './globals.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

	constructor(private globals: Globals) {

	}

	intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {

		if (req.url.indexOf(this.globals.getInternal('api')) != -1) {

			let cloneReq = req.clone({
				headers: req.headers.set('x-current-device', 'mobile')
			});

			if (this.globals.getInternal('token')) {
				cloneReq = cloneReq.clone({
					headers: req.headers.set('x-session-token', this.globals.getInternal('token'))
				});	
			}
			
			return next.handle(cloneReq);
		}

		return next.handle(req);
	}
}