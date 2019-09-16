import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  /** 読み込み完了フラグ */
  isLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor() {
  }
}
