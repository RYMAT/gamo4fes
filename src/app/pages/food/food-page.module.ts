import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodPageComponent } from './food-page/food-page.component';
import { foodRouting } from './food-page-routing';


@NgModule({
  declarations: [FoodPageComponent],
  imports: [
    CommonModule,
    foodRouting,
  ]
})
export class FoodPageModule {
}
