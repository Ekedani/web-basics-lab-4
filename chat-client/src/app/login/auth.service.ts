import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _username: string = '';

  constructor() {
  }

  public login(username: string) {
    this._username = username;
  }

  public get isLoggedIn(): boolean {
    return this._username !== '';
  }

  public get username(): string {
    return this._username;
  }

  public logout() {
    this._username = '';
  }
}
