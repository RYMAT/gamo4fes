import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { animate, AnimationEvent, query, stagger, style, transition, trigger } from '@angular/animations';
import { StateService } from './core/service/state/state.service';
import { Subscription } from 'rxjs';
import { GaService } from './core/service/ga/ga.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';

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

  isHidden: boolean;
  state: string;
  splashState: string = '';
  subscription: Subscription = new Subscription();

  constructor(private stateService: StateService,
              private router: Router,
              private renderer: Renderer2,
              private gaService: GaService) {
    // TODO: 公開の際に削除する
    const productionOrigin: string = 'gamo4fes.com';
    const host: string = location.host;
    if (environment.production && host.indexOf(productionOrigin) !== -1) {
      this.isHidden = true;
      const html = document.getElementsByTagName('html');
      this.renderer.setStyle(html[0], 'overflow-y', 'hidden');
    }
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

  onActivate() {
    window.scrollTo(0, 0);
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
    setTimeout(() => {
      luxy.init({
        wrapper: '#parallax',
        targets: '.parallax-el',
        wrapperSpeed: 0.2
      });
    });
    this.setState('show');
  }

  private setState(_state: string) {
    setTimeout(() => this.state = _state);
  }

  onDoneSplash(event: AnimationEvent) {
    this.splashState = 'show';
  }
}
