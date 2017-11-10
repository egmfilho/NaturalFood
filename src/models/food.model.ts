/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-11-09 17:21:39 
 * @Last Modified by:   egmfilho 
 * @Last Modified time: 2017-11-09 17:21:39 
 */

export class Food {
    
    public id: number;
    public name: string;
    public images: string[];
    public price: number;
    public description: string;

    constructor(foodInfo: any) {
        this.id = foodInfo.id;
        this.name = foodInfo.name;
        this.images = foodInfo.images;
        this.price = foodInfo.price;
        this.description = foodInfo.description;
    }

    static convertToInternal(food: any) {
        return {
            id: food.product_id,
            name: food.product_name,
            images: food.images.map(i => i.image_uri + 'large.jpg'),
            price: food.price.product_price_value,
            description: food.product_description || '(Sem descrição)'
        }
    }
}