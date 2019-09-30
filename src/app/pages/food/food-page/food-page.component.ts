import { Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { JsonConvertService } from '../../../core/service/json-convert/json-convert.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Shop } from '../../../models/shop';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StateService } from '../../../core/service/state/state.service';
import { AppConstant, RouteConstant } from '../../../core/constants';
import * as imageLoaded from 'imagesloaded';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent implements OnInit, OnDestroy {
  @ViewChild('shopModalTemplate', { static: true }) modalTemplate: TemplateRef<any>;

  shops: Shop[];
  modalRef: BsModalRef;

  selectedShop$: BehaviorSubject<Shop> = new BehaviorSubject<Shop>(null);

  constructor(private jsonConvertService: JsonConvertService,
              private titleService: Title,
              private sanitizer: DomSanitizer,
              private state: StateService,
              private el: ElementRef,
              private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.fetchShops();
    this.selectedShop$.pipe(filter(v => !!v)).subscribe(() => {
      this.openModal();
    });
    const { FOOD } = RouteConstant;
    const title: string = FOOD.data.description;
    this.titleService.setTitle(`${title} | ${AppConstant.PROJECT_TITLE}`);
    const els = this.el.nativeElement.querySelectorAll('.bg-image');
    if (!els) {
      this.state.isLoaded.next(true);
      return;
    }
    // 画像の読み込みを監視
    imageLoaded(els, { background: true }).on('done', () => {
      this.state.isLoaded.next(true);
      this.document.body.scrollTop = 0;
    });
  }


  ngOnDestroy(): void {
    if (!this.selectedShop$.closed) {
      this.selectedShop$.unsubscribe();
    }
  }

  onShowFoodModal(shop: Shop) {
    this.selectedShop$.next(shop);
  }

  private fetchShops() {
    this.jsonConvertService.fetchShops().subscribe(val => this.shops = val);
  }

  private openModal() {
    this.modalRef = this.modalService.show(this.modalTemplate, { class: 'modal-lg' });
  }

  onModalClose() {
    this.modalRef.hide();
  }
}
