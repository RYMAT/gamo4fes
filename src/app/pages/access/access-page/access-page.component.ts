import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StateService } from '../../../core/service/state/state.service';
import { Title } from '@angular/platform-browser';
import { AppConstant, RouteConstant } from '../../../core/constants';

@Component({
  selector: 'app-access-page',
  templateUrl: './access-page.component.html',
  styleUrls: ['./access-page.component.scss']
})
export class AccessPageComponent implements OnInit, AfterViewInit {

  constructor(private state: StateService,
              private titleService: Title) {
  }

  ngOnInit() {
    const { ACCESS } = RouteConstant;
    const title: string = ACCESS.data.description;
    this.titleService.setTitle(`${title} | ${AppConstant.PROJECT_TITLE}`);
  }

  ngAfterViewInit(): void {
    this.state.isLoaded.next(true);
  }

}
