import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ResizeService } from './services/resize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    public resizeService: ResizeService,
  ) {}
}
