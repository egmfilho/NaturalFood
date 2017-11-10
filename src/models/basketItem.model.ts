/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-11-09 17:21:29 
 * @Last Modified by:   egmfilho 
 * @Last Modified time: 2017-11-09 17:21:29 
 */

import { Food } from './food.model';

export class BasketItem {

    public food: Food;
    public quantity: number;

    constructor(basketItemInfo: any) {
        this.food = new Food(basketItemInfo.food);
        this.quantity = basketItemInfo.quantity;
    }
}