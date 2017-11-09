/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-11-09 16:56:12 
 * @Last Modified by: egmfilho
 * @Last Modified time: 2017-11-09 17:00:44
 */

import { Injectable } from '@angular/core';

@Injectable()
export class Globals {

	private dictionary: any = { };
	private internal: any = {
		'api': 'http://172.16.0.176/api/',
		'token': null
	}

    set(key: string, value: any) {
		if (key == 'internal')
			return;

        this.dictionary[key] = value;
	}
	
	get(key: string) {
		return this.dictionary[key];
	}

	remove(key: string) {
		if (key == 'internal')
			return;

		delete this.dictionary[key];
	}

	setInternal(key: string, value: any) {
		this.internal[key] = value;
	}

	getInternal(key: string) {
		return this.internal[key];
	}

	// flush() {
	// 	this.dictionary = { };
	// 	this.internal = {
	// 		'api': this.internal.api
	// 	};
	// }
}