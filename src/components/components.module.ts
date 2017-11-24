import { NgModule } from '@angular/core';
import { CategoryCardComponent } from './category-card/category-card';
import { BasketComponent } from './basket/basket';
import { FoodCardComponent } from './food-card/food-card';

@NgModule({
	declarations: [CategoryCardComponent,
    BasketComponent,
    FoodCardComponent],
	imports: [],
	exports: [CategoryCardComponent,
    BasketComponent,
    FoodCardComponent]
})
export class ComponentsModule {}
