import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Support } from '../../../models/support';

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
}
