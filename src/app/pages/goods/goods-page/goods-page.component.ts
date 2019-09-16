import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StateService } from '../../../core/service/state/state.service';
import { Title } from '@angular/platform-browser';
import { AppConstant, RouteConstant } from '../../../core/constants';

@Component({
  selector: 'app-goods-page',
  templateUrl: './goods-page.component.html',
  styleUrls: ['./goods-page.component.scss']
})
export class GoodsPageComponent implements OnInit, AfterViewInit {

  constructor(private state: StateService,
              private titleService: Title) {
  }

  ngOnInit() {
    const { GOODS } = RouteConstant;
    const title: string = GOODS.data.description;
    this.titleService.setTitle(`${title} | ${AppConstant.PROJECT_TITLE}`);
  }

  ngAfterViewInit(): void {
    this.state.isLoaded.next(true);
  }

}
