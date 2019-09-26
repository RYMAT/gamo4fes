import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodPageComponent } from './food-page/food-page.component';
import { foodRouting } from './food-page-routing';
import { FooterModule } from '../../shared/footer/footer.module';


@NgModule({
  declarations: [FoodPageComponent],
  imports: [
    CommonModule,
    foodRouting,
    FooterModule,
  ]
})
export class FoodPageModule {
}
