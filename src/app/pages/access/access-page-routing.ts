import { Route, RouterModule } from '@angular/router';
import { AccessPageComponent } from './access-page/access-page.component';

const accessRoutes: Route[] = [
  {
    path: '',
    component: AccessPageComponent,
  }
];

export const accessRouting = RouterModule.forChild(accessRoutes);
