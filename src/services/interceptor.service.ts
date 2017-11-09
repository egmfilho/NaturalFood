import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/observable';

import { Globals } from './globals.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

	constructor(private globals: Globals) {

	}

	intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {

		if (this.globals.getInternal('token')) {
			const clone = req.clone({
				headers: req.headers.set('x-session-token', this.globals.getInternal('token'))
			});
			
			return next.handle(clone);
		} else {
			return next.handle(req);
		}
	}
}