import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ResizeService } from 'src/angular/app/services/resize.service';
import { links as _links } from '../../links';

const DEFAULT_LABEL = 'APP.TOOLBAR.ADMIN_PANEL';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  links = _links;

  currentLabel!: string;

  isSmallScreen = false;

  constructor(private router: Router, resizeService: ResizeService) {
    resizeService.innerWidth$.subscribe(
      (width) => (this.isSmallScreen = width < 1000),
    );
  }

  ngOnInit(): void {
    this.updateLabel(window.location.pathname);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateLabel(event.url);
      }
    });
  }

  private updateLabel(url: string) {
    const page = url.split('/')[2];
    if (!page) {
      this.currentLabel = DEFAULT_LABEL;
      return;
    }
    const link = _links.find((l) => l.link === page);
    if (!link) {
      this.currentLabel = DEFAULT_LABEL;
      return;
    }
    this.currentLabel = link.label;
  }
}
