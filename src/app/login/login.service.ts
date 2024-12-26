import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}
  private loginUrl = 'http://localhost:8080/login';


  loginUser(user: any): Observable<any> {
    return this.http.post(this.loginUrl, user);
  }

}
