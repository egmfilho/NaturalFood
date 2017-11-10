/*
 * @Author: egmfilho &lt;egmfilho@live.com&gt; 
 * @Date: 2017-11-09 17:21:39 
 * @Last Modified by:   egmfilho 
 * @Last Modified time: 2017-11-09 17:21:39 
 */

export class Food {
    
    public id: number;
    public name: string;
    public imageUrl: string;
    public price: number;
    public description: string;

    constructor(foodInfo: any) {
        this.id = foodInfo.id;
        this.name = foodInfo.name;
        this.imageUrl = foodInfo.imageUrl;
        this.price = foodInfo.price;
        this.description = foodInfo.description;
    }
}