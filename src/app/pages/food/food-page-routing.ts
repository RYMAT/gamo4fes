import { Route, RouterModule } from '@angular/router';
import { FoodPageComponent } from './food-page/food-page.component';

const foodRoutes: Route[] = [
  {
    path: '',
    component: FoodPageComponent,
  }
];

export const foodRouting = RouterModule.forChild(foodRoutes);
