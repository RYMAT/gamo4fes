import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessPageComponent } from './access-page/access-page.component';
import { accessRouting } from './access-page-routing';
import { FooterModule } from '../../shared/footer/footer.module';
import { ScrollTopButtonModule } from '../../shared/scroll-top-button/scroll-top-button.module';


@NgModule({
  declarations: [AccessPageComponent],
  imports: [
    CommonModule,
    accessRouting,
    FooterModule,
    ScrollTopButtonModule,
  ]
})
export class AccessPageModule {
}
