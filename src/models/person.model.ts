/*
* @Author: egmfilho &lt;egmfilho@live.com&gt; 
* @Date: 2017-11-21 13:36:25 
 * @Last Modified by: egmfilho
 * @Last Modified time: 2017-12-15 13:10:11
*/

import { Contact } from "./contact.model";
import { Address } from "./address.model";

export class Person {
	public id: number;
	public name: string;
	public birthDate: Date;
	public cpf: string;
	public rg: string;
	public gender: string;
	public weight: number;
	public contact: Contact[];
	public address: Address[];

	constructor(person: any) {
		if (!(person instanceof Person)) {
			person = Person.convertFromPost(person);
		}

		this.id = person.id;
		this.name = person.name;
		this.birthDate = new Date(person.birthDate);
		this.cpf = person.cpf;
		this.rg = person.rg;
		this.gender = person.gender;
		this.weight = person.weight;
		this.contact = person.contact ? person.contact.map(c => new Contact(c)) : [ ];
		this.address = person.address ? person.address.map(a => new Address(a)) : [ ];
	}

	public static convertFromPost(person: any) {
		if (!person) person = { };
		
		return {
			id: person.person_id,
			name: person.person_name,
			birthDate: new Date(person.person_birth),
			cpf: person.person_cpf,
			rg: person.person_rg,
			gender: person.person_gender,
			weight: person.person_weight && parseFloat(person.person_weight.replace(',', '.')),
			contact: person.contact,
			address: person.address,
		}
	}

	getMainAddress() {
		return this.address.find(a => a.isMain);
	}

	convertToPost() {
		return {
			person_id: this.id,
			person_name: this.name,
			person_birth: this.birthDate,
			person_cpf: this.cpf,
			person_rg: this.rg,
			person_gender: this.gender,
			person_weight: this.weight,
			contact: this.contact.map(c => c.convertToPost()),
			address: this.address.map(a => a.convertToPost())
		}
	}
}