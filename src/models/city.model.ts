import { UF } from "./uf.model";

export class City {
	public id: string;
	public ibge: string;
	public name: string;
	public uf: UF;

	constructor(city: any) {
		if (!(city instanceof City)) {
			city = City.convertFromPost(city);
		}

		this.id = city.id;
		this.ibge = city.ibge;
		this.name = city.name;
		this.uf = new UF(city.uf);
	}

	public static convertFromPost(city: any) {
		if (!city) return { };

		return {
			id: city.city_id,
			ibge: city.city_ibge,
			name: city.city_name,
			uf: city.city_uf
		}
	}
}