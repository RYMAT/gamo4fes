import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Support } from '../../../models/support';
import { Artist } from '../../../models/artist';
import { Shop } from '../../../models/shop';

@Injectable({
  providedIn: 'root'
})
export class JsonConvertService {

  constructor(private http: HttpClient) {
  }

  // 協賛
  fetchSupports(): Observable<Support[]> {
    return this.http.get('/assets/jsons/supports.json') as Observable<Support[]>;
  }

  // アーティスト
  fetchArtists(): Observable<Artist[]> {
    return this.http.get('/assets/jsons/artists.json') as Observable<Artist[]>;
  }

  // 飲食店
  fetchShops(): Observable<Shop[]> {
    return this.http.get('/assets/jsons/shops.json') as Observable<Shop[]>;
  }
}
