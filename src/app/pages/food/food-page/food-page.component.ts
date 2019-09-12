import { Component, OnInit } from '@angular/core';
import { JsonConvertService } from '../../../core/service/json-convert/json-convert.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap';
import { Shop } from '../../../models/shop';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent implements OnInit {

  shops: Shop[];

  constructor(private jsonConvertService: JsonConvertService,
              private titleService: Title,
              private sanitizer: DomSanitizer,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.fetchShops();
  }

  private fetchShops() {
    this.jsonConvertService.fetchShops().subscribe(val => this.shops = val);
  }
}
