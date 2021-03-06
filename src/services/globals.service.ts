/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-11-09 16:56:12 
 * @Last Modified by: egmfilho
 * @Last Modified time: 2017-12-15 12:29:54
 */

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Globals {

	private dictionary: any;
	private internal: any;

	constructor(private storage: Storage) {
		this.dictionary = { };
		this.internal = {
			// 'api': 'http://172.16.0.96/app/',
			'api': 'http://www.naturalfoodteresopolis.com.br/app/',
			'token': null,
			'errorMessage': 'Não foi possível estabelecer uma conexão com o servidor. Tente novamente mais tarde.'
		};
	}

    set(key: string, value: any) {
		// if (key == 'internal')
			// return;

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

	removeAll() {
		this.dictionary = [];
	}

	setInternal(key: string, value: any) {
		this.internal[key] = value;
	}

	removeInternal(key: string) {
		delete this.internal[key];
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

	setPersistent(key: string, value: any) {
		return this.storage.set(key, value);
	}

	getPersistent(key: string) {
		return this.storage.get(key);
	}

	removePersistent(key: string) {
		return this.storage.remove(key);
	}
}