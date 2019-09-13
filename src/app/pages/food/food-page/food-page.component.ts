import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JsonConvertService } from '../../../core/service/json-convert/json-convert.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Shop } from '../../../models/shop';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

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
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.fetchShops();
    this.selectedShop$.pipe(filter(v => !!v)).subscribe(() => {
      this.openModal();
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
}
