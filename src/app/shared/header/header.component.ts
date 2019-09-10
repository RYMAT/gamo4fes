import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { RouteConstant } from '../../core/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navigation: Route[] = [];

  constructor() {
    const { LIVE, FOOD, EVENT, ACCESS, GOODS } = RouteConstant;
    const routes: Route[] = [LIVE, FOOD, EVENT, ACCESS, GOODS] as Route[];
    this.navigation.push(...routes);
  }

  ngOnInit() {
  }
}
