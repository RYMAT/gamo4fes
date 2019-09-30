import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { StateService } from '../../../core/service/state/state.service';
import { Title } from '@angular/platform-browser';
import { AppConstant, RouteConstant } from '../../../core/constants';
import * as imageLoaded from 'imagesloaded';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-access-page',
  templateUrl: './access-page.component.html',
  styleUrls: ['./access-page.component.scss']
})
export class AccessPageComponent implements OnInit {

  constructor(private state: StateService,
              private el: ElementRef,
              @Inject(DOCUMENT) private document: Document,
              private titleService: Title) {
  }

  ngOnInit() {
    const { ACCESS } = RouteConstant;
    const title: string = ACCESS.data.description;
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
