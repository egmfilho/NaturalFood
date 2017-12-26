export class Credit {
	public personId: number;
	public code: string;
	public deadline: Date;
	public description: string;
	public id: number;
	public value: number;
	public valueOpen: number;

	constructor(credit: any) {
		if (!(credit instanceof Credit)) {
			credit = Credit.convertFromPost(credit);
		}

		this.personId = credit.personId;
		this.code = credit.code;
		this.deadline = credit.deadline;
		this.description = credit.description;
		this.id = credit.id;
		this.value = credit.value;
		this.valueOpen = credit.valueOpen;
	}

	public static convertFromPost(credit: any) {
		return {
			personId: credit.person_id,
			code: credit.title_code,
			deadline: credit.title_deadline ? new Date(credit.title_deadline) : null,
			description: credit.title_description,
			id: credit.title_id,
			value: credit.title_value,
			valueOpen: credit.title_value_open
		}
	}
}