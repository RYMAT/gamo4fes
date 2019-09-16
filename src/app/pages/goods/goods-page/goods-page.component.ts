import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StateService } from '../../../core/service/state/state.service';

@Component({
  selector: 'app-goods-page',
  templateUrl: './goods-page.component.html',
  styleUrls: ['./goods-page.component.scss']
})
export class GoodsPageComponent implements OnInit, AfterViewInit {

  constructor(private state: StateService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log('loaded');
    this.state.isLoaded.next(true);
  }

}
