import { Component, OnInit } from '@angular/core';
import { JsonConvertService } from '../../../core/service/json-convert/json-convert.service';
import { DomSanitizer, SafeUrl, Title } from '@angular/platform-browser';
import { Artist } from '../../../models/artist';

@Component({
  selector: 'app-live-page',
  templateUrl: './live-page.component.html',
  styleUrls: ['./live-page.component.scss']
})
export class LivePageComponent implements OnInit {

  artists: Artist[];

  constructor(private jsonConvertService: JsonConvertService,
              private titleService: Title,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.fetchArtists();
  }

  onShowTimeTablePdf() {
    window.open('/assets/images/time-table.pdf');
  }

  private fetchArtists() {
    this.jsonConvertService.fetchArtists().subscribe(v => this.artists = v);
  }

  getSafeUrl(url: string): SafeUrl {
    if (!url) {
      return;
    }
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
