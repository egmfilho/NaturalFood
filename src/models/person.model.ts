/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-11-21 13:36:25 
 * @Last Modified by: egmfilho
 * @Last Modified time: 2017-11-21 17:59:34
 */

export class Person {
	public name: string;
	public lastName: string;
	public email: string;
	public password: string;
	public ddd: number;
	public tel: number;

	constructor(person: any) {
		this.name = person.name;
		this.lastName = person.lastName;
		this.email = person.email;
		this.password = person.password;
		this.ddd = person.ddd;
		this.tel = person.tel;
	}

	convertToPost() {
		return {
			person_name: this.name,
			person_last_name: this.lastName,
			person_mail: this.email,
			person_password: this.password,
			person_ddd: this.ddd,
			person_tel: this.tel
		}
	}
}