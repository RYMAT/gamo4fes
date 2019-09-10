import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { RouteConstant } from '../../core/constants';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  navigation: Route[] = [];
  subscription: Subscription = new Subscription();
  // 表示中のroute
  activeRoute: string;

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
}
