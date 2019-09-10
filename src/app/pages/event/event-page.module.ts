import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPageComponent } from './event-page/event-page.component';
import { eventRouting } from './event-page-routing';


@NgModule({
  declarations: [EventPageComponent],
  imports: [
    CommonModule,
    eventRouting,
  ]
})
export class EventPageModule {
}
