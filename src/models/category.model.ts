/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-11-09 16:56:54 
 * @Last Modified by:   egmfilho 
 * @Last Modified time: 2017-11-09 16:56:54 
 */

export class Category {
	
	public id: number;
	public imageUrl: string;
	public title: string;
	public subtitle: string;

	constructor(category: any) {
		this.id = category.id;
		this.imageUrl = category.imageUrl;
		this.title = category.title;
		this.subtitle = category.subtitle;
	}

	static convertToInternal(product_category: any) {
		return {
			id: product_category.product_category_id,
			imageUrl: product_category.image && product_category.image.image_uri + 'large.jpg',
			title: product_category.product_category_name,
			subtitle: product_category.product_category_description,
		}
	}
}