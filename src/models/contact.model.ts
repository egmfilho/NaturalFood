/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-12-15 08:15:24 
 * @Last Modified by: egmfilho
 * @Last Modified time: 2017-12-15 08:24:18
 */

export class Contact {
	public id: number;
	public isMain: boolean;
	public reference: string;
	public typeId: number;
	public value: string;
	public parentId: number;

	constructor(contact: any) {
		if (!(contact instanceof Contact)) {
			contact = Contact.convertFromPost(contact);
		}
		
		this.id = contact.id;
		this.isMain = contact.isMain;
		this.reference = contact.reference;
		this.typeId = contact.typeId;
		this.value = contact.value;
		this.parentId = contact.parentId;
	}

	public static convertFromPost(contact: any) {
		if (!contact) contact = { };
		
		return {
			id: contact.contact_id,
			isMain: contact.contact_main == 'Y',
			reference: contact.contact_reference,
			typeId: contact.contact_type_id,
			value: contact.contact_value,
			parentId: contact.parent_id
		}
	}

	convertToPost() {
		return {
			contact_id: this.id,
			contact_main: this.isMain ? 'Y' : 'N',
			contact_reference: this.reference,
			contact_type_id: this.typeId,
			contact_value: this.value,
			parent_id: this.parentId
		}
	}
}