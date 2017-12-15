/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-12-15 09:04:06 
 * @Last Modified by: egmfilho
 * @Last Modified time: 2017-12-15 09:44:41
 */

export class Plan {
	public id: number;
	public code: string;
	public name: string;
	public description: string;
	public price: number;

	constructor(plan: any) {
		if (!(plan instanceof Plan)) {
			plan = Plan.convertFromPost(plan);
		}

		this.id = plan.id;
		this.code = plan.code;
		this.name = plan.name;
		this.description = plan.description;
		this.price = plan.price;
	}

	public static convertFromPost(plan: any) {
		if (!plan) plan = { };

		return {
			id: plan.plan_id,
			code: plan.plan_code,
			name: plan.plan_name,
			description: plan.plan_description,
			price: plan.plan_value,
		}
	}

	convertToPost() {
		return {
			plan_id: this.id,
			plan_code: this.code,
			plan_name: this.name,
			plan_description: this.description,
			plan_value: this.price
		}
	}
}