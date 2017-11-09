import { Food } from './food.model';

export class BasketItem {

    public food: Food;
    public quantity: number;

    constructor(basketItemInfo: any) {
        this.food = new Food(basketItemInfo.Food);
        this.quantity = basketItemInfo.quantity;
    }
}