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
        this.description = foodInfo.descriotion;
    }
}