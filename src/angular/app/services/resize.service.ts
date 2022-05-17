import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  innerWidth$ = new BehaviorSubject<number>(window.innerWidth);
  constructor() {
    window.addEventListener('resize', () =>
      this.innerWidth$.next(window.innerWidth),
    );
  }
}
