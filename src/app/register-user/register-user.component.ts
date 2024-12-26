import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { SessionService } from '../session.service';
import { RegisterUserService } from './register-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-user',
  standalone: true,
  templateUrl: './register-user.component.html',
  imports: [FormsModule,CommonModule], // Add FormsModule here
  styleUrl: './register-user.component.css'
})


export class RegisterUserComponent {
 
  userName: string = '';
  password: string = '';
  email: string = '';
  name: string = '';
  //constructor(private router: Router, private sessionService:SessionService) {} // Inject Router in the constructor
  constructor(private registerService:RegisterUserService, private router: Router){
  }
  registerNewUser(){

    const newUser = {
      name: this.name,
      password: this.password,
      email: this.email,
      userName: this.userName,
    };
    this.registerService.createUser(newUser).subscribe((result:any)=>{
     if(result.responseMessage==='success'){
      alert('User Created');
     }
    
    })
    console.log('Call Backend service....');
  }

}
