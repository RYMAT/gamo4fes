import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodPageComponent } from './food-page/food-page.component';
import { foodRouting } from './food-page-routing';
import { FooterModule } from '../../shared/footer/footer.module';
import { MatRippleModule } from '@angular/material/core';
import { ScrollTopButtonModule } from '../../shared/scroll-top-button/scroll-top-button.module';


@NgModule({
  declarations: [FoodPageComponent],
  imports: [
    CommonModule,
    foodRouting,
    FooterModule,
    MatRippleModule,
    ScrollTopButtonModule,
  ]
})
export class FoodPageModule {
}
