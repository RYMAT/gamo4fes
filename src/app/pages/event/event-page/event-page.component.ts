import { Component, ElementRef, OnInit } from '@angular/core';
import { StateService } from '../../../core/service/state/state.service';
import { AppConstant, RouteConstant } from '../../../core/constants';
import { Title } from '@angular/platform-browser';
import * as imageLoaded from 'imagesloaded';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

  constructor(private state: StateService,
              private el: ElementRef,
              private titleService: Title) {
  }

  ngOnInit() {
    const { EVENT } = RouteConstant;
    const title: string = EVENT.data.description;
    this.titleService.setTitle(`${title} | ${AppConstant.PROJECT_TITLE}`);
    const els = this.el.nativeElement.querySelectorAll('.bg-image');
    if (!els) {
      this.state.isLoaded.next(true);
      return;
    }
    // 画像の読み込みを監視
    imageLoaded(els, { background: true }).on('done', () => {
      this.state.isLoaded.next(true);
    });
  }
}
