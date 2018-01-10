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
	public imageData: string;
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
		this.imageData = user.imageData;
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
			// imageData: user.image ? user.image.image_data : null,
			imageData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD8klEQVRYR63XachtcxQG8N81S4ZrHkIkYxGZh8xDhlxkSMiUD0iJ8EGRlJkiPpjnDB8MmWeZ5yhjhpCZIgkZe1j7ts+++5zznpf15X3be/3X/9lrPetZ68wwPVsSayJ/Y9/info7UcQZE3gvi6OwH9ZG9+xfeAu34XJ8OZXYUwEwP07FCfgRN+NBvIGv65KlsS52xoFYGBfgTPw6Csg4ACvjTqyK03HZuIAI4KPL/wPMwifDQIwCkEufxHfYCx9NJaUtn1VwB5bA1viw7/wwAIvgxUr5Dvhhwssb90XxSJVko4o3EGoYgCuxO9bHF9O8vDm2HF7DPTiyG6sPwAZ4CQfg9v94eXN8X9yCDQvM7LB9AMLy1cu5cQwZ98Zv1WYN+7v4FsP+SAnvxrsth5fxXnXJUAAL4Rsch5Qhtjkewk+YF79jq07w+CXVz2Fm+YZ8+1Tq8z7pvxhL1ft/gnczsAvuq2BfFYB0ws/YA/PhqRKcgzqff2G1XNL8Pa6vLEYxY8sUn3bFA83ZLoCTcAyS8sbSw5fgvHqQr8glyUzb0nIRnXAndgiuKF1o/D7GpTh3GICLkHbZshX5JmyCg5EShSNX45QOgONxBpKZT3FVzYYdW35PF8Hj21uCoFsL27UORWZDqICI3Y+wOpxoW/hxXWUgmX2zytYWsMerfMlyL4CzEeFJiru2RnVBr6K1nFcs4XkbGVBtewUPt7PX5cCxOK2Y2oNh4FE0f7N6EvaPHDrllw7LTEmmezOwLR7DCvh8BIJc/jqSlVj6fb0xIJbHZ1XelKIXQAQkwycjdZQKhow3tlJ5VpG0y4v2N4Q3IfDi7ZnQp4TPFlHm0O1xNRnzPsKWRWagffsAnIwTkZRFev8PS4ekpOfjnHbAPgAr1exOyiIufRaOhAPb1MsnigOpcZ9ln0hJs2MMLCfDxnFG54LYfkjAeXB48SAuEZ+IU+ZEnz1acp4RP2DDAKQbcij1en5I0AXwS71r/9913xThVT5mNvsbp1ErWZznqnWqGzRi835LHV/AaiXBXd8Msz+Rj5rDRgHIYpK17DDc0JO5PXFvPd8Nd/UoX+bHNdgYr04KIP5ZrQ+t1ay72Wb+N+ta+//mnpA5q9i1tdL3VnLcWp7apn5/FOMbocm4zpDJl8WSqWzBGbexCFU6Y+7iUcOViUrQOOeyaH2mW3b8BsQW9Tx+mQnPtC7Pb4l16nkDaloZaA4lWNaybElZOLLb9Vl2ySyf2X52KtBDXP99PK4E7cNh/q3Fh8hqZkF+nsXysyxaEPlO3bOYZikZa5MASLC05RFFqmYSNpdkIoa02YTSdlOySQG0gwZAUh5LSdor+JQuj9PfqGbJIYxM9MUAAAAASUVORK5CYII=',
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