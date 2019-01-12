import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { Profile } from '../models/profile';
import { browser } from 'protractor';


@Injectable()
export class AuthService {

  public userProfile: Profile;

  private requestedScopes = 'openid profile';
  private accessTokenKey = 'access_token';
  private idTokenKey = 'id_token';
  private expiresAtKey = 'expires_at';
  private scopesKey = 'scopes';

  private auth0 = new auth0.WebAuth({
    clientID: 'SNkl18d3r4OPTob3uTa8n1UR7mUsx2mG',
    domain: 'my-todo.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/tasks',
    audience: 'todoAPI',
    scope: this.requestedScopes
  });

  constructor(private router: Router) {
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err: any, authResult: any) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          this.setSession(authResult);
          this.router.navigate(['/tasks']);
          resolve();
        } else if (err) {
          this.router.navigate(['/tasks']);
          console.log(err);
          reject();
        }
      });
    });
  }

  private setSession(authResult: any): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    // If there is a value on the scope param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes = authResult.scope || this.requestedScopes || '';

    localStorage.setItem(this.accessTokenKey, authResult.accessToken);
    localStorage.setItem(this.idTokenKey, authResult.idToken);
    localStorage.setItem(this.expiresAtKey, expiresAt);
    localStorage.setItem(this.scopesKey, JSON.stringify(scopes));
  }

  public renewTokens(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err: any, authResult: any) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          this.router.navigate(['/tasks']);
          resolve();
        } else if (err) {
          alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
          this.logout();
          reject();
        }
      });
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.idTokenKey);
    localStorage.removeItem(this.expiresAtKey);
    localStorage.removeItem(this.scopesKey);
    this.userProfile = null;
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem(this.expiresAtKey));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(callback: Function): void {
    const accessToken = localStorage.getItem(this.accessTokenKey);
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err: any, profile: Profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      callback(err, profile);
      this.router.navigate(['/tasks']);
    });
  }
}