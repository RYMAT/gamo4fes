import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { JsonConvertService } from '../../../core/service/json-convert/json-convert.service';
import { Support } from '../../../models/support';
import { DomSanitizer, SafeUrl, Title } from '@angular/platform-browser';
import { AppConstant, RouteConstant } from '../../../core/constants';
import { IRoutePaths } from '../../../core/constants/route.constant';
import { Router } from '@angular/router';
import { StateService } from '../../../core/service/state/state.service';
import * as imageLoaded from 'imagesloaded';

declare var $;

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.scss']
})
export class TopPageComponent implements OnInit {
  readonly routes: IRoutePaths = RouteConstant;
  @ViewChild('gamoyon', { static: true }) gamyonEl: ElementRef;

  supports: Support[];
  isLoaded: boolean;

  constructor(private jsonConvertService: JsonConvertService,
              private titleService: Title,
              private sanitizer: DomSanitizer,
              private state: StateService,
              private ngZone: NgZone,
              private el: ElementRef,
              private router: Router) {
  }

  ngOnInit() {
    this.fetchSupports();
    const { TOP } = RouteConstant;
    const title: string = TOP.data.description;
    this.titleService.setTitle(`${title} | ${AppConstant.PROJECT_TITLE}`);
    const els = this.el.nativeElement.querySelectorAll('.bg-image');
    if (!els) {
      this.state.isLoaded.next(true);
      this.isLoaded = true;
      return;
    }
    // 画像の読み込みを監視
    imageLoaded(els, { background: true }).on('done', () => {
      this.state.isLoaded.next(true);
      this.isLoaded = true;
    });
  }

  private fetchSupports() {
    this.jsonConvertService.fetchSupports().subscribe(val => this.supports = val);
  }

  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onMovePage(path: string) {
    this.router.navigate([path]);
  }

  onOpenTimeTable(path: string) {
    window.open(path);
  }

  onMoveGamoyon() {
    const rect = this.gamyonEl.nativeElement.getBoundingClientRect();
    this.ngZone.runOutsideAngular(() => {
      $('html,body').animate({ scrollTop: rect.top + window.scrollY - 60 }, 300);
    });
  }
}
