import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivePageComponent } from './live-page/live-page.component';
import { liveRouting } from './live-page-routing';
import { FooterModule } from '../../shared/footer/footer.module';
import { MatRippleModule } from '@angular/material';
import { ScrollTopButtonModule } from '../../shared/scroll-top-button/scroll-top-button.module';


@NgModule({
  imports: [
    CommonModule,
    liveRouting,
    FooterModule,
    MatRippleModule,
    ScrollTopButtonModule,
  ],
  declarations: [LivePageComponent],
})
export class LivePageModule {
}
