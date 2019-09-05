import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPageComponent } from './top-page/top-page.component';
import { topRouting } from './top-page-routing';


@NgModule({
  imports: [
    CommonModule,
    topRouting,
  ],
  declarations: [TopPageComponent],
})
export class TopPageModule {
}
