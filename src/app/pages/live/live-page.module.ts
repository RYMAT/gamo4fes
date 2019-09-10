import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivePageComponent } from './live-page/live-page.component';
import { liveRouting } from './live-page-routing';


@NgModule({
  imports: [
    CommonModule,
    liveRouting,
  ],
  declarations: [LivePageComponent],
})
export class LivePageModule {
}
