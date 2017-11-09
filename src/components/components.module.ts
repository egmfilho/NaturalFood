import { NgModule } from '@angular/core';
import { CategoryCardComponent } from './category-card/category-card';
import { BasketComponent } from './basket/basket';
@NgModule({
	declarations: [CategoryCardComponent,
    BasketComponent],
	imports: [],
	exports: [CategoryCardComponent,
    BasketComponent]
})
export class ComponentsModule {}
