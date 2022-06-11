import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/common/types/user.types';
import { UsersService } from '../users.service';

@Component({
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  create = false;

  username?: string;

  form = new UntypedFormGroup({
    username: new UntypedFormControl(''),
    firstName: new UntypedFormControl(''),
    secondName: new UntypedFormControl(''),
    lastName: new UntypedFormControl(''),
    email: new UntypedFormControl('', [Validators.email]),
    password: new UntypedFormControl(''),
    confirmPassword: new UntypedFormControl(''),
  });

  constructor(
    private router: Router,
    activatedRoute: ActivatedRoute,
    private usersService: UsersService,
  ) {
    activatedRoute.data.subscribe((data) => {
      this.create = !!data['create'];
    });
    activatedRoute.params.subscribe((params) => {
      this.username = params['username'];
      const formControl = this.form.controls['username'];
      if (formControl) {
        formControl.setValue(this.username || '');
        if (this.username) {
          usersService.getUser(this.username).subscribe((user) => {
            if (user) {
              Object.keys(user)
                .map((key) => key as keyof User)
                .filter((key) =>
                  Object.prototype.hasOwnProperty.call(this.form.controls, key),
                )
                .filter((key) => !!user[key])
                .forEach((key) => this.form.controls[key].setValue(user[key]));
            }
          });
        } else {
          Object.keys(this.form.controls)
            .map((key) => this.form.controls[key])
            .forEach((control) => control.setValue(''));
        }
      }
    });
  }

  ngOnInit(): void {}
}
