export class UF {
	public code: string;
	public ibge: string;
	public id: string;
	public name: string;

	constructor(uf: any) {
		if (!(uf instanceof UF)) {
			uf = UF.convertFromPost(uf);
		}
		
		this.code = uf.code;
		this.ibge = uf.ibge;
		this.id = uf.id;
		this.name = uf.name;
	}

	public static convertFromPost(uf: any) {
		if (!uf) return { };

		return {
			code: uf.uf_code,
			ibge: uf.uf_ibge,
			id: uf.uf_id,
			name: uf.uf_name
		}
	}
}