import { Route, RouterModule } from '@angular/router';
import { GoodsPageComponent } from './goods-page/goods-page.component';

const goodsRoutes: Route[] = [
  {
    path: '',
    component: GoodsPageComponent,
  }
];

export const goodsRouting = RouterModule.forChild(goodsRoutes);
