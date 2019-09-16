import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StateService } from '../../../core/service/state/state.service';
import { AppConstant, RouteConstant } from '../../../core/constants';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit, AfterViewInit {

  constructor(private state: StateService,
              private titleService: Title) {
  }

  ngOnInit() {
    const { EVENT } = RouteConstant;
    const title: string = EVENT.data.description;
    this.titleService.setTitle(`${title} | ${AppConstant.PROJECT_TITLE}`);
  }

  ngAfterViewInit(): void {
    this.state.isLoaded.next(true);
  }

}
