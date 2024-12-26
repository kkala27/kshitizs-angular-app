import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SessionService } from './session.service';
import { Router } from '@angular/router'; // Import Router
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule,MatToolbarModule,MatMenuModule,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(private sessionService : SessionService,private router: Router){}
  title = 'kk-app-ui';
  name: string = '';
  userName: string = '';
  email: string = '';
  isAdmin: boolean=false;

  ngOnInit(){
    if(this.sessionService.isLoggedIn()){
     this.name = this.sessionService.getSession().name;
     this.userName=this.sessionService.getSession().userName;
     this.email=this.sessionService.getSession().email;
     this.isAdmin = this.sessionService.getSession().isAdmin;
    }
  }

  setProfileDetails(): void{
    this.name = this.sessionService.getSession().name;
     this.userName=this.sessionService.getSession().userName;
     this.email=this.sessionService.getSession().email;
     this.isAdmin = this.sessionService.getSession().isAdmin;
  }

  logout(): void {
    this.sessionService.clearSession();
    this.router.navigate(['/login']);
  }

  isLoggedIn(){
    return this.sessionService.isLoggedIn();
  }
  isAdminUser(){
    return this.isAdmin;
  }

}
