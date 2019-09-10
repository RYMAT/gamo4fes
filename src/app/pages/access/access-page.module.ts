import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessPageComponent } from './access-page/access-page.component';
import { accessRouting } from './access-page-routing';


@NgModule({
  declarations: [AccessPageComponent],
  imports: [
    CommonModule,
    accessRouting,
]
})
export class AccessPageModule {
}
