import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsPageComponent } from './goods-page/goods-page.component';
import { goodsRouting } from './goods-page-routing';


@NgModule({
  declarations: [GoodsPageComponent],
  imports: [
    CommonModule,
    goodsRouting,
  ]
})
export class GoodsPageModule {
}
