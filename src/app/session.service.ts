import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly SESSION_STORAGE_KEY = 'userSession';

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }

  setSession(data: any): void {
    if (this.isBrowser()) {
      sessionStorage.setItem(this.SESSION_STORAGE_KEY, JSON.stringify(data));
    }
  }

  getSession(): any {
    if (this.isBrowser()) {
      const sessionData = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
      return sessionData ? JSON.parse(sessionData) : null;
    }
    return null;
  }

  clearSession(): void {
    sessionStorage.removeItem(this.SESSION_STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getSession();
  }
}
