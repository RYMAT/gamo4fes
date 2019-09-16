import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare var $;

@Component({
  selector: 'app-scroll-top-button',
  templateUrl: './scroll-top-button.component.html',
  styleUrls: ['./scroll-top-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollTopButtonComponent implements OnInit, OnDestroy, OnChanges {

  /** ボタンを表示するスクロール判定値 */
  @Input() activeScrollValue: number = 400;
  /** 表示フラグ */
  isActive: boolean;

  private removeListener = () => {
  }

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      // スクロールイベントはAngular外で購読する
      this.removeListener = this.renderer.listen('window', 'scroll', () => {

        const nextActive = this.getActive();
        // isActiveが変わった場合のみ、Angular内で動作させて、
        // isActiveを書き換える
        // ChangeDetectionStrategy.OnPushとしているので、markForCheckでisActiveが変更されたことを
        // 教えてあげる必要がある
        if (this.isActive !== nextActive) {
          this.ngZone.run(() => {
            this.isActive = nextActive;
            this.changeDetectorRef.markForCheck();
          });
        }
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // ボタン表示のしきい値が変更された場合は、再度isActiveの判定を行う
    // ngOnChangesの場合は、必ず変更検知されるため、markForCheckは実行する必要なし
    if (changes.activeScrollValue) {
      this.isActive = this.getActive();
    }
  }

  ngOnDestroy() {
    this.removeListener();
  }

  onScrollTop() {
    // アニメーションスクロールは大量に変更検知を実行してしまうので
    // Angular外での実行とする
    this.ngZone.runOutsideAngular(() => {
      $('html,body').animate({ scrollTop: 0 }, 150);
    });
  }

  private getActive() {
    const scrollTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;
    return scrollTop > this.activeScrollValue;
  }
}
