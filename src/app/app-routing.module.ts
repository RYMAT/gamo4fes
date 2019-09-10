import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteConstant } from './core/constants';

const { TOP, LIVE, FOOD, EVENT, ACCESS, GOODS } = RouteConstant;

const routes: Routes = [
  {
    path: TOP.path,
    loadChildren: () => import('./pages/top/top-page.module').then(m => m.TopPageModule),
    data: TOP.data,
  },
  {
    path: LIVE.path,
    loadChildren: () => import('./pages/live/live-page.module').then(m => m.LivePageModule),
    data: LIVE.data,
  },
  {
    path: FOOD.path,
    loadChildren: () => import('./pages/food/food-page.module').then(m => m.FoodPageModule),
    data: FOOD.data,
  },
  {
    path: EVENT.path,
    loadChildren: () => import('./pages/event/event-page.module').then(m => m.EventPageModule),
    data: EVENT.data,
  },
  {
    path: ACCESS.path,
    loadChildren: () => import('./pages/access/access-page.module').then(m => m.AccessPageModule),
    data: ACCESS.data,
  },
  {
    path: GOODS.path,
    loadChildren: () => import('./pages/goods/goods-page.module').then(m => m.GoodsPageModule),
    data: GOODS.data,
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
