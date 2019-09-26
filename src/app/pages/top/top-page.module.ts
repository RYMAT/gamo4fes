import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPageComponent } from './top-page/top-page.component';
import { topRouting } from './top-page-routing';
import { ButtonModule } from '../../shared/button/button.module';
import { ScrollStyleModule } from '../../shared/scroll-style/scroll-style.module';
import { TooltipModule } from 'ngx-bootstrap';
import { FooterModule } from '../../shared/footer/footer.module';


@NgModule({
  imports: [
    CommonModule,
    topRouting,
    ButtonModule,
    ScrollStyleModule,
    TooltipModule,
    FooterModule,
  ],
  declarations: [TopPageComponent],
})
export class TopPageModule {
}
