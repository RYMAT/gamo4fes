import { Route, RouterModule } from '@angular/router';
import { EventPageComponent } from './event-page/event-page.component';

const eventRoutes: Route[] = [
  {
    path: '',
    component: EventPageComponent,
  }
];

export const eventRouting = RouterModule.forChild(eventRoutes);
