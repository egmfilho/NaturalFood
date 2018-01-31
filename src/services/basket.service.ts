/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-11-09 17:23:05 
 * @Last Modified by: egmfilho
 * @Last Modified time: 2017-11-23 10:26:54
 */

import { Injectable } from '@angular/core';

import { BasketItem } from './../models/basketItem.model';


@Injectable()
export class BasketService {

    private list: BasketItem[] = [];

    getItems(): BasketItem[] {
        return this.list;
    }
    
    addItem(item: BasketItem) {
        let index = this.list.findIndex(i => i.food.id === item.food.id);
        
        if (index > 0) {
            this.list[index].quantity += item.quantity;
        } else {
            this.list.push(item);
        }
    }

    removeItem(item: BasketItem) {
        let index = this.list.indexOf(item);
        
        if (index >= 0) {
            this.list.splice(index, 1);
        }
    }

    getPrice() {
        return this.list.reduce((total, item) => {
            return total + item.getPrice();
        }, 0);
    }

    clear() {
        this.list = [];
    }

}