import { Component } from '@angular/core';
import { animate, AnimationEvent, query, stagger, style, transition, trigger } from '@angular/animations';
import { StateService } from './core/service/state/state.service';
import { Subscription } from 'rxjs';

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
export class AppComponent {

  state: string;
  splashState: string = '';
  subscription: Subscription = new Subscription();

  constructor(private stateService: StateService) {
    this.subscription.add(this.stateService.isLoaded.subscribe(v => this.onLoad(v)));
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
    this.setState('show');
  }

  private setState(_state: string) {
    setTimeout(() => this.state = _state);
  }

  onDoneSplash(event: AnimationEvent) {
    this.splashState = 'show';
  }
}
