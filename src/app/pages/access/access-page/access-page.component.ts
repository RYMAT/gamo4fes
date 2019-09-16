import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StateService } from '../../../core/service/state/state.service';

@Component({
  selector: 'app-access-page',
  templateUrl: './access-page.component.html',
  styleUrls: ['./access-page.component.scss']
})
export class AccessPageComponent implements OnInit, AfterViewInit {

  constructor(private state: StateService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log('loaded');
    this.state.isLoaded.next(true);
  }

}
