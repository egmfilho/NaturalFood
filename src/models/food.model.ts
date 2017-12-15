/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-11-09 17:21:39 
 * @Last Modified by: egmfilho
 * @Last Modified time: 2017-12-15 10:09:50
 */

export class Food {
    
    public id: number;
    public name: string;
    public images: string[];
    public price: number;
    public description: string;
    public planId: number;

    public tags: string[];
    public relevance: number;

    constructor(food: any) {
        if (!(food instanceof Food)) {
            food = Food.convertFromPost(food);
        }

        this.id = food.id;
        this.name = food.name;
        this.images = food.images;
        this.price = food.price;
        this.description = food.description;
        this.planId = food.planId;
        
        this.tags = food.tags || [];
        this.relevance = 0;
    }

    public static convertFromPost(food: any) {
        if (!food) food = { };
        
        return {
            id: food.product_id,
            name: food.product_name,
            images: food.images.map(i => i.image_uri + 'large.jpg'),
            price: food.price.product_price_value,
            description: food.product_description || '(Sem descrição)',
            planId: food.plan_id,
            tags: food.product_tags
        }
    }
}