import { Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { JsonConvertService } from '../../../core/service/json-convert/json-convert.service';
import { DomSanitizer, SafeUrl, Title } from '@angular/platform-browser';
import { Artist } from '../../../models/artist';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StateService } from '../../../core/service/state/state.service';
import { AppConstant, RouteConstant } from '../../../core/constants';
import * as imageLoaded from 'imagesloaded';

@Component({
  selector: 'app-live-page',
  templateUrl: './live-page.component.html',
  styleUrls: ['./live-page.component.scss']
})
export class LivePageComponent implements OnInit, OnDestroy {

  @ViewChild('artistModalTemplate', { static: true }) modalTemplate: TemplateRef<any>;
  isLoaded: boolean;
  artists: Artist[];
  modalRef: BsModalRef;
  selectedArtist$: BehaviorSubject<Artist> = new BehaviorSubject<Artist>(null);

  private isLoadedBgImage: boolean;
  private isLoadedImage: boolean;

  constructor(private jsonConvertService: JsonConvertService,
              private titleService: Title,
              private sanitizer: DomSanitizer,
              private state: StateService,
              private el: ElementRef,
              private renderer: Renderer2,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.fetchArtists();
    this.selectedArtist$.pipe(filter(v => !!v)).subscribe(() => {
      this.openModal();
    });
    const { LIVE } = RouteConstant;
    const title: string = LIVE.data.description;
    this.titleService.setTitle(`${title} | ${AppConstant.PROJECT_TITLE}`);
    const els = this.el.nativeElement.querySelectorAll('.bg-image');
    if (!els) {
      this.state.isLoaded.next(true);
      return;
    }
    // 画像の読み込みを監視
    imageLoaded(els, { background: true }).on('done', () => {
      this.isLoadedBgImage = true;
      this.onCheckImgLoaded();
    });
    imageLoaded('time-table-image', ).on('done', () => {
      this.isLoadedImage = true;
      this.onCheckImgLoaded();
    });
  }

  ngOnDestroy(): void {
    if (!this.selectedArtist$.closed) {
      this.selectedArtist$.unsubscribe();
    }
  }

  private onCheckImgLoaded() {
    if (this.isLoadedBgImage && this.isLoadedImage) {
      this.state.isLoaded.next(true);
      this.isLoaded = true;
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
    const body = document.body;
    this.renderer.addClass(body, 'is-modal');
    this.modalRef = this.modalService.show(this.modalTemplate, { class: 'modal-lg' });
  }

  onModalClose() {
    this.modalRef.hide();
    const body = document.body;
    this.renderer.removeClass(body, 'is-modal');
  }
}
