import { Injectable } from '@angular/core';

@Injectable()
export class Globals {

	private dictionary: any = { };
	private internal: any = {
		'api': 'http://172.16.0.176/api/',
		'session': null
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
}