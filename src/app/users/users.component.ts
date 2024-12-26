import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatInputModule, MatButtonModule,MatIconModule,MatCardModule,FormsModule,MatTableModule,MatToolbarModule,CommonModule,MatGridListModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  usersData: any= [];

  displayedColumns: string[] = ['name', 'userName', 'email'];
  constructor(private usersService:UsersService){}

  ngOnInit(): void {
    this.usersService.listUsers().subscribe((data) => {
      this.usersData = data;
    });
  }

}
