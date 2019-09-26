import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivePageComponent } from './live-page/live-page.component';
import { liveRouting } from './live-page-routing';
import { FooterModule } from '../../shared/footer/footer.module';


@NgModule({
  imports: [
    CommonModule,
    liveRouting,
    FooterModule,
  ],
  declarations: [LivePageComponent],
})
export class LivePageModule {
}
