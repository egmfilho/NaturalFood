/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-11-21 13:36:25 
 * @Last Modified by: egmfilho
 * @Last Modified time: 2017-11-21 17:59:34
 */

export class Person {
	public id: number;
	public name: string;
	public birthDate: Date;
	public cpf: string;
	public rg: string;
	public gender: string;
	public password: string;

	constructor(person: any) {
		this.name = person.name;
		this.password = person.password;
	}

	convertToPost() {
		return {
			person_name: this.name,
			person_password: this.password
		}
	}
}