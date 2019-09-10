import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPageComponent } from './top-page/top-page.component';
import { topRouting } from './top-page-routing';
import { ButtonModule } from '../../shared/button/button.module';


@NgModule({
  imports: [
    CommonModule,
    topRouting,
    ButtonModule,
  ],
  declarations: [TopPageComponent],
})
export class TopPageModule {
}
