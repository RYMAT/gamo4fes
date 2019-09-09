import { Component, OnInit } from '@angular/core';
import { JsonConvertService } from '../../../core/json-convert/json-convert.service';
import { Support } from '../../../models/support';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.scss']
})
export class TopPageComponent implements OnInit {

  supports: Support[];

  constructor(private jsonConvertService: JsonConvertService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.fetchSupports();
  }

  private fetchSupports() {
    this.jsonConvertService.fetchSupports().subscribe(val => this.supports = val);
  }

  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
