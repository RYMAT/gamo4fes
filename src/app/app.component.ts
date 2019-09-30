import { Component, Inject, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { animate, AnimationEvent, query, stagger, style, transition, trigger } from '@angular/animations';
import { StateService } from './core/service/state/state.service';
import { Subscription } from 'rxjs';
import { GaService } from './core/service/ga/ga.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

declare var luxy;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('splash', [
      transition('show => change', [
        query('.splash', [
          style({ opacity: 1, transform: 'translateX(calc(-100vw - 200px))' }),
          stagger(-100, [
            animate('900ms cubic-bezier(0.645, 0.045, 0.355, 1)',
              style({ opacity: 1, transform: 'translateX(calc(100vw + 200px))' }))
          ])
        ])
      ])
    ])
  ],
})
export class AppComponent implements OnInit, OnDestroy {

  state: string;
  splashState: string = '';
  subscription: Subscription = new Subscription();

  constructor(private stateService: StateService,
              private router: Router,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2,
              private zone: NgZone,
              private gaService: GaService) {
    this.subscription.add(this.stateService.isLoaded.subscribe(v => this.onLoad(v)));
  }

  ngOnInit(): void {
    this.subscription.add(
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd)
      ).subscribe((params: any) => {
        this.gaService.sendPageView(params.url);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // タッチデバイス判定
  get isTouchDevice() {
    return (window.ontouchstart === null);
  }

  onActivate() {
    window.scrollTo(0, 0);
    if (this.isTouchDevice) {
      this.document.body.scrollTop = 0;
    }
    // 初回は処理しない
    if (!!this.state) {
      this.setState('change');
      this.splashState = 'change';
      return;
    }
    this.splashState = 'show';
  }

  onLoad(isLoaded: boolean) {
    if (!isLoaded) {
      this.setState('');
      return;
    }
    if (!this.isTouchDevice) {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          luxy.init({
            wrapper: '#parallax',
            targets: '.parallax-el',
            wrapperSpeed: 0.09
          });
        });
      });
    }
    this.setState('show');
  }

  private setState(_state: string) {
    setTimeout(() => this.state = _state);
  }

  onDoneSplash(event: AnimationEvent) {
    this.splashState = 'show';
  }
}
