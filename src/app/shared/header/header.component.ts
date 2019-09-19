import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { RouteConstant } from '../../core/constants';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { animate, AnimationEvent, query, stagger, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('addModal', [
      state('true', style({ background: 'linear-gradient(40deg, #00A73D, #00B383)', width: '150%', height: '150%' })),
      state('false', style({ background: 'transparent', width: '*', height: '*' })),
      transition('false <=> true', animate('900ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
    ]),
    trigger('navList', [
      transition('default => show', [
        query('.nav-list-menu', [
          style({ opacity: 0, transform: 'translateX(200px)' }),
          stagger(100, [
            animate('600ms 50ms cubic-bezier(0.6, 0.15, 0.3, 0.8)',
              style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ])
      ])
    ])
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {

  navigation: Route[] = [];
  subscription: Subscription = new Subscription();
  // 表示中のroute
  activeRoute: string;
  navAnimationState: string = 'default';

  @Input() isActiveHamburger: boolean = false;
  @Output() isActiveHamburgerChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {
    const { LIVE, FOOD, EVENT, ACCESS, GOODS } = RouteConstant;
    const routes: Route[] = [LIVE, FOOD, EVENT, ACCESS, GOODS] as Route[];
    this.navigation.push(...routes);
  }

  ngOnInit() {
    this.subscription.add(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd))
        .subscribe((e: NavigationEnd) => {
          this.activeRoute = e.urlAfterRedirects.replace('/', '');
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onChangeHamburgerState() {
    this.isActiveHamburger = !this.isActiveHamburger;
    this.isActiveHamburgerChange.emit(this.isActiveHamburger);
  }

  onMovePage(path: string) {
    if (this.activeRoute === path) {
      return;
    }
    this.router.navigate([path]);
    if (this.isActiveHamburger) {
      this.onChangeHamburgerState();
    }
  }

  onAnimationDone(e: AnimationEvent) {
    // 初回のみ 'defaultへ' ngForのレンダリング後にアニメーションさせるため
    if (e.fromState === 'void' && e.toState === 'default') {
      this.navAnimationState = 'show';
      return;
    }
    if (e.toState === 'show') {
      this.navAnimationState = 'default';
      return;
    }
  }
}
