/*
* @Author: egmfilho &lt;egmfilho@live.com&gt; 
* @Date: 2017-12-14 17:29:55 
 * @Last Modified by: egmfilho
 * @Last Modified time: 2017-12-15 12:57:12
*/

import { Person } from "./person.model";
import { Plan } from "./plan.model";

export class User {
	public id: number;
	public personId: number;
	public planId: number;
	public name: string;
	public email: string;
	public password: string;
	public imageUrl: string;
	public person: Person;
	public plan: Plan;

	constructor(user: any) {
		if (!(user instanceof User)) {
			user = User.convertFromPost(user);
		}

		this.id = user.id;
		this.personId = user.personId;
		this.planId = user.planId;
		this.name = user.name;
		this.email = user.email;
		this.imageUrl = user.imageUrl;
		this.person = new Person(user.person);
		this.plan = new Plan(user.plan);
	}

	public static convertFromPost(user: any) {
		if (!user) user = { };
		
		return {
			id: user.user_id,
			personId: user.person_id,
			planId: user.plan_id,
			name: user.user_name,
			email: user.user_mail,
			imageUrl: user.image ? user.image.image_uri + 'small.jpg' : null,
			person: user.person,
			plan: user.plan
		}
	}

	convertToPost() {
		return {
			user_id: this.id,
			person_id: this.personId,
			plan_id: this.planId,
			user_name: this.name,
			user_mail: this.email,
			user_pass: this.password
		}
	}
}