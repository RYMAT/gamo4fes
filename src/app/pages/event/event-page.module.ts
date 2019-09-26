import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPageComponent } from './event-page/event-page.component';
import { eventRouting } from './event-page-routing';
import { FooterModule } from '../../shared/footer/footer.module';


@NgModule({
  declarations: [EventPageComponent],
  imports: [
    CommonModule,
    eventRouting,
    FooterModule,
  ]
})
export class EventPageModule {
}
