import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[scrollStyle]'
})
export class ScrollStyleDirective implements OnInit, OnDestroy, AfterViewInit {

  private componentPosition: number;

  constructor(el: ElementRef,
              private _renderer: Renderer2,
              private _zone: NgZone) {
    this.targetEl = el.nativeElement as HTMLElement;
  }

  // 発火時に付与するのクラス名
  @Input() addClassName: string = 'is-active';
  // 発火タイミングのオフセット (px)
  @Input() offsetHeight: number = 0;
  // 発火後にスクロールバックした場合、クラスを除去するかどうか
  @Input() isResetClass: boolean = true;
  @Input() listenerTarget: 'window' | 'body' = 'window';

  targetEl: HTMLElement;

  private _removeListener = () => {
  }

  ngOnInit() {
    // change detection回避のため
    this._zone.runOutsideAngular(() => {
      this._removeListener = this._renderer.listen(this.listenerTarget, 'scroll', () => {
        if (!this.componentPosition) {
          return;
        }
        const scrollPosition = this.getScrollY(window);
        // console.log(this.getScrollY(window));
        const windowHeight = window.innerHeight;
        if ((scrollPosition + windowHeight) >= (this.componentPosition + this.offsetHeight)) {
          this._renderer.addClass(this.targetEl, this.addClassName);
        } else if (this.isResetClass
          && (scrollPosition + windowHeight) < (this.componentPosition + this.offsetHeight + 20)) {
          this._renderer.removeClass(this.targetEl, this.addClassName);
        }
      });
    });
  }

  private getScrollY(window) {
    if (this.listenerTarget === 'window') {
      if ('scrollY' in window) {
        return window.scrollY;
      }
      if ('pageYOffset' in window) {
        return window.pageYOffset;
      }
      const doc = window.document;
      return doc.documentElement.scrollTop || doc.body.scrollTop;
    }
    const doc = window.document;
    return doc.documentElement.scrollTop || doc.body.scrollTop;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.componentPosition = this.targetEl.getBoundingClientRect().top);
  }

  ngOnDestroy() {
    this._removeListener();
  }
}
