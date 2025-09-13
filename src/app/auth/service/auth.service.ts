import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../user-model';

export interface ISignupPayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface ISignInPayload extends ISignupPayload {
  registered: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private _HttpClient: HttpClient) {}

  private signupURL: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDWCCg8o4xToWScMd59-U-6Nlw5WADRRFA';

  // signup(email: string, password: string): Observable<ISignupPayload> {
  //   return this._HttpClient.post<ISignupPayload>(this.signupURL, {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true,
  //   });
  // }

  private handleAuthentication(
    email: string,
    userId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(email, userId, idToken, expirationDate);
    this.user.next(user);
  }

  login(email: string, password: string): Observable<ISignInPayload> {
    return this._HttpClient.post<ISignInPayload>(this.signupURL, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}
