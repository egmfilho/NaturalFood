import { District } from "./district.model";

/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-12-15 08:27:16 
 * @Last Modified by: egmfilho
 * @Last Modified time: 2017-12-15 11:23:36
 */

export class Address {
	public cep: string;
	public code: string;
	public complement: string;
	public id: number;
	public isMain: boolean;
	public number: number;
	public publicPlace: string;
	public districtId: number;
	public district: District;

	constructor(address: any) {
		if (!(address instanceof Address)) {
			address = Address.convertFromPost(address);
		}

		this.cep = address.cep;
		this.code = address.code;
		this.complement = address.complement;
		this.id = address.id;
		this.isMain = address.isMain;
		this.number = address.number;
		this.publicPlace = address.publicPlace;
		this.districtId = address.districtId;
		this.district = new District(address.district);
	}

	public static convertFromPost(address: any) {
		if (!address) address = { };
		
		return {
			cep: address.address_cep,
			code: address.address_code,
			complement: address.address_complement,
			id: address.address_id,
			isMain: address.address_main == 'Y',
			number: address.address_number,
			publicPlace: address.address_public_place,
			districtId: address.district_id,
			district: address.district
		}
	}

	toString() {
		return `${this.publicPlace} ${this.number} - ${this.district.name}, ${this.district.city.name} - ${this.district.city.uf.name}`;
	}

	convertToPost() {
		return {
			address_cep: this.cep,
			address_code: this.code,
			address_complement: this.complement,
			address_id: this.id,
			address_main: this.isMain ? 'Y' : 'N',
			address_number: this.number,
			address_public_place: this.publicPlace,
			district_i: this.districtId
		}
	}
}