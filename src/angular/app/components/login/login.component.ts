import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {}
  login() {
    this.authService.login(this.loginForm.value).subscribe((user) => {
      if (user) {
        this.router.navigate(['']);
      }
    });
  }
}
