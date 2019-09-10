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
      description: 'トップページ',
      isIndex: true,
    }
  },
  LIVE: {
    path: 'live',
    data: {
      title: 'live',
      titleJp: 'ライブ',
      description: 'ライブ・出演者情報',
      isIndex: false,
    }
  },
  FOOD: {
    path: 'food',
    data: {
      title: 'food',
      titleJp: 'フード',
      description: 'フード・出店情報',
      isIndex: false,
    }
  },
  EVENT: {
    path: 'event',
    data: {
      title: 'event',
      titleJp: 'イベント',
      description: 'イベント情報',
      isIndex: false,
    }
  },
  ACCESS: {
    path: 'access',
    data: {
      title: 'access',
      titleJp: 'アクセス',
      description: 'アクセス・エリアマップ',
      isIndex: false,
    }
  },
  GOODS: {
    path: 'goods',
    data: {
      title: 'goods',
      titleJp: 'グッズ',
      description: 'グッズ情報',
      isIndex: false,
    }
  },
};
