import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JsonConvertService } from '../../../core/service/json-convert/json-convert.service';
import { DomSanitizer, SafeUrl, Title } from '@angular/platform-browser';
import { Artist } from '../../../models/artist';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-live-page',
  templateUrl: './live-page.component.html',
  styleUrls: ['./live-page.component.scss']
})
export class LivePageComponent implements OnInit, OnDestroy {

  @ViewChild('artistModalTemplate', { static: true }) modalTemplate: TemplateRef<any>;

  artists: Artist[];
  modalRef: BsModalRef;

  selectedArtist$: BehaviorSubject<Artist> = new BehaviorSubject<Artist>(null);

  constructor(private jsonConvertService: JsonConvertService,
              private titleService: Title,
              private sanitizer: DomSanitizer,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.fetchArtists();
    this.selectedArtist$.pipe(filter(v => !!v)).subscribe(() => {
      this.openModal();
    });
  }

  ngOnDestroy(): void {
    if (!this.selectedArtist$.closed) {
      this.selectedArtist$.unsubscribe();
    }
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

  onShowArtistModal(artist: Artist) {
    this.selectedArtist$.next(artist);
  }

  private openModal() {
    this.modalRef = this.modalService.show(this.modalTemplate, { class: 'modal-lg' });
  }
}
