/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-11-09 16:56:54 
 * @Last Modified by: egmfilho
 * @Last Modified time: 2017-12-15 10:20:45
 */

export class Category {
	
	public id: number;
	public imageUrl: string;
	public title: string;
	public subtitle: string;

	constructor(category: any) {
		if (!(category instanceof Category)) {
			category = Category.convertFromPost(category);
		}

		this.id = category.id;
		this.imageUrl = category.imageUrl;
		this.title = category.title;
		this.subtitle = category.subtitle;
	}

	public static convertFromPost(product_category: any) {
		if (!product_category) product_category = { };
		
		return {
			id: product_category.product_category_id,
			imageUrl: product_category.image && product_category.image.image_uri + 'large.jpg',
			title: product_category.product_category_name,
			subtitle: product_category.product_category_description,
		}
	}
}