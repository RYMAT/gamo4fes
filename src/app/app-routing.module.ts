import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteConstant } from './core/constants';

const routes: Routes = [
  {
    path: RouteConstant.TOP.path,
    loadChildren: () => import('./pages/top/top-page.module').then(m => m.TopPageModule),
    data: RouteConstant.TOP.data,
  },
  {
    path: RouteConstant.LIVE.path,
    loadChildren: () => import('./pages/live/live-page.module').then(m => m.LivePageModule),
    data: RouteConstant.LIVE.data,
  },
  {
    path: RouteConstant.FOOD.path,
    loadChildren: () => import('./pages/food/food-page.module').then(m => m.FoodPageModule),
    data: RouteConstant.FOOD.data,
  },
  {
    path: RouteConstant.EVENT.path,
    loadChildren: () => import('./pages/event/event-page.module').then(m => m.EventPageModule),
    data: RouteConstant.EVENT.data,
  },
  {
    path: RouteConstant.ACCESS.path,
    loadChildren: () => import('./pages/access/access-page.module').then(m => m.AccessPageModule),
    data: RouteConstant.ACCESS.data,
  },
  {
    path: RouteConstant.GOODS.path,
    loadChildren: () => import('./pages/goods/goods-page.module').then(m => m.GoodsPageModule),
    data: RouteConstant.GOODS.data,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
