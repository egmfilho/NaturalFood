/*
* @Author: egmfilho &lt;egmfilho@live.com&gt; 
* @Date: 2017-12-14 17:29:55 
 * @Last Modified by: egmfilho
 * @Last Modified time: 2017-12-14 17:40:19
*/

import { Person } from "./person.model";

export class User {
	public id: number;
	public personId: number;
	public planId: number;
	public mail: string;
	public name: string;
	public person: Person;

	constructor(user: any) {
		this.id = user.user_id;
		this.personId = user.person_id;
		this.planId = user.plan_id;
		this.mail = user.user_mail;
		this.name = user.user_name;
		this.person = new Person(user.person);
	}

	convertFromPost(user) {
		return {
			id: user.user_id,
			personId: user.person_id,
			planId: user.plan_id,
			mail: user.user_mail,
			name: user.user_name,
			person: new Person(user.person)
		}
	}

	convertToPost() {
		return {
			
		}
	}
}