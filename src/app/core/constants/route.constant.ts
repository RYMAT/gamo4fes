import { Route } from '@angular/router';
import { InjectionToken } from '@angular/core';

// ルーティング定数をDIして使用する為に、InjectionTokenを定義
export let ROUTES_CONSTANT = new InjectionToken('routes.constant');

export interface IRoutePaths {
  TOP: Route;
  LIVE: Route;
  FOOD: Route;
  EVENT: Route;
  ACCESS: Route;
  GOODS: Route;
}

export const RouteConstant: IRoutePaths = {
  TOP: {
    path: '',
    data: {
      title: '',
      titleJp: '',
      isIndex: true,
    }
  },
  LIVE: {
    path: 'live',
    data: {
      title: 'live',
      titleJp: 'ライブ',
      isIndex: false,
    }
  },
  FOOD: {
    path: 'food',
    data: {
      title: 'food',
      titleJp: 'フード',
      isIndex: false,
    }
  },
  EVENT: {
    path: 'event',
    data: {
      title: 'event',
      titleJp: 'イベント',
      isIndex: false,
    }
  },
  ACCESS: {
    path: 'access',
    data: {
      title: 'access',
      titleJp: 'アクセス',
      isIndex: false,
    }
  },
  GOODS: {
    path: 'goods',
    data: {
      title: 'goods',
      titleJp: 'グッズ',
      isIndex: false,
    }
  },
};
