import { Injectable } from '@angular/core';

import { BasketItem } from './../models/basketItem.model';


@Injectable()
export class BasketService {

    private list: BasketItem[] = [];

    getItems() {
        return this.list;
    }
    
    addItem(item: BasketItem) {
        let index = this.list.indexOf(item);
        
        if (index > 0) {
            // this.list[index].quantity += item.quantity;
        } else {
            this.list.push(item);
        }
    }

    removeItem(item: BasketItem) {
        let index = this.list.indexOf(item);
        
        if (index > 0) {
            this.list.splice(index, 1);
        }
    }

}