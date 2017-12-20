import { City } from "./city.model";

export class District {
	public id: string;
	public cityId: string;
	public name: string;
	public city: City;

	constructor(district: any) {
		if (!(district instanceof District)) {
			district = District.convertFromPost(district);
		}

		this.id = district.id;
		this.cityId = district.cityId;
		this.name = district.name;
		this.city = new City(district.city);
	}

	public static convertFromPost(district: any) {
		if (!district) return { };

		return {
			id: district.district_id,
			cityId: district.city_id,
			name: district.district_name,
			city: district.city
		}
	}
}