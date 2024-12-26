import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { SessionService } from '../session.service';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Declare this component as standalone
  imports: [FormsModule] // Add FormsModule here
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private sessionService:SessionService,private loginService:LoginService) {} // Inject Router in the constructor

  ngOnInit(): void {
    if(this.sessionService.isLoggedIn()){
      console.log('User session is available redirecting to dashboard.');
      this.router.navigate(['/dashboard']);
    }
  }



  onSubmit() {
    const user = {
      password: this.password,
      userName: this.username,
    };
    this.loginService.loginUser(user).subscribe((response)=>{
       if(response.message=='success'){
        const sessionData = { username: this.username, token: 'mock-token' };
        this.sessionService.setSession(response);
        this.router.navigate(['/dashboard']); // Navigate to the Dashboard component
       }else {
        alert('Invalid username or password');
      }
    })
  }
  registerNewUser(){
    console.log('Add logic for new user');
    this.router.navigate(['/register']);
  }
}
