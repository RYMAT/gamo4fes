import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsPageComponent } from './goods-page/goods-page.component';
import { goodsRouting } from './goods-page-routing';
import { FooterModule } from '../../shared/footer/footer.module';


@NgModule({
  declarations: [GoodsPageComponent],
  imports: [
    CommonModule,
    goodsRouting,
    FooterModule,
  ]
})
export class GoodsPageModule {
}
