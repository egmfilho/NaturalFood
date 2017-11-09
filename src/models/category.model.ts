import { Component } from '@angular/core';

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
			// imageUrl: product_category.product_category_id,
			title: product_category.product_category_name,
		}
	}
}