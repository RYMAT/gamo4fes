import { Route, RouterModule } from '@angular/router';
import { LivePageComponent } from './live-page/live-page.component';

const liveRoutes: Route[] = [
  {
    path: '',
    component: LivePageComponent,
  }
];

export const liveRouting = RouterModule.forChild(liveRoutes);
