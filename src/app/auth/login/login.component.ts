import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import {
  AuthService,
  ISignInPayload,
  ISignupPayload,
} from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../user-model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(11),
    ]),
  });

  loggedInUser: ISignInPayload = {
    email: '',
    expiresIn: '',
    idToken: '',
    localId: '',
    refreshToken: '',
    registered: false,
  };

  private _authService = inject(AuthService);
  private _Router: Router = inject(Router);

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this._authService.login(email!, password!).subscribe({
      next: (res: ISignupPayload) => {
        console.log(res);
        console.log(res.idToken);
        this.loggedInUser = {
          ...res,
          registered: (res as any).registered ?? false,
        };
        const expirationDate = new Date(
          new Date().getTime() + +res.expiresIn * 1000
        );

        this._authService.user.next(
          new User(res.email, res.localId, res.idToken, expirationDate)
        );
      },
      error: (err) => console.error(err),
      complete: () => {
        localStorage.setItem('userToken', btoa(this.loggedInUser.idToken));
        this._Router.navigate(['/']);
      },
    });
  }
}
