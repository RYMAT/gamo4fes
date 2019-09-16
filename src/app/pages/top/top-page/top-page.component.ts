import { AfterViewInit, Component, OnInit } from '@angular/core';
import { JsonConvertService } from '../../../core/service/json-convert/json-convert.service';
import { Support } from '../../../models/support';
import { DomSanitizer, SafeUrl, Title } from '@angular/platform-browser';
import { AppConstant, RouteConstant } from '../../../core/constants';
import { IRoutePaths } from '../../../core/constants/route.constant';
import { Router } from '@angular/router';
import { StateService } from '../../../core/service/state/state.service';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.scss']
})
export class TopPageComponent implements OnInit, AfterViewInit {
  readonly routes: IRoutePaths = RouteConstant;

  supports: Support[];

  constructor(private jsonConvertService: JsonConvertService,
              private titleService: Title,
              private sanitizer: DomSanitizer,
              private state: StateService,
              private router: Router) {
  }

  ngOnInit() {
    this.fetchSupports();
    const { TOP } = RouteConstant;
    const title: string = TOP.data.description;
    this.titleService.setTitle(`${title} | ${AppConstant.PROJECT_TITLE}`);
  }

  ngAfterViewInit(): void {
    console.log('loaded');
    this.state.isLoaded.next(true);
  }

  private fetchSupports() {
    this.jsonConvertService.fetchSupports().subscribe(val => this.supports = val);
  }

  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onMovePage(path: string) {
    this.router.navigate([path]);
  }

  onOpenTimeTable(path: string) {
    window.open(path);
  }
}
