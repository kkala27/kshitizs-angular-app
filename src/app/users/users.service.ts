import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root',
})

export class UsersService {

  private listUsersUrl = 'http://localhost:8080/list-users';

  constructor(private http: HttpClient) {}
 listUsers(): Observable<any> {
    return this.http.get<any>(this.listUsersUrl);
  }

}
