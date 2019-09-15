import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { RouteConstant } from '../../core/constants';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('addModal', [
      state('true', style({ backgroundColor: 'rgba(255,255,255,0.9)', width: '150%', height: '150%' })),
      state('false', style({ backgroundColor: 'rgba(255,255,255,0)', width: '*', height: '*' })),
      transition('* => true', animate('700ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
      transition('true => false', animate('700ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      )),
    ]),
    trigger('navList', [
      state('void', style({ opacity: 0, transform: 'translateX(-1000px)', height: 0 })),
      state('', style({ opacity: 1, transform: 'translateX(0)', height: '*' })),
      transition(':enter', animate('1200ms cubic-bezier(0.25, 0.8, 0.25, 1)'), { delay: 700 }),
    ]),

  ],
})
export class HeaderComponent implements OnInit, OnDestroy {

  navigation: Route[] = [];
  subscription: Subscription = new Subscription();
  // 表示中のroute
  activeRoute: string;

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
    this.router.navigate([path]);
    if (this.isActiveHamburger) {
      this.onChangeHamburgerState();
    }
  }
}
