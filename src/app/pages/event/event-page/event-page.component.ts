import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StateService } from '../../../core/service/state/state.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit, AfterViewInit {

  constructor(private state: StateService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log('loaded');
    this.state.isLoaded.next(true);
  }

}
