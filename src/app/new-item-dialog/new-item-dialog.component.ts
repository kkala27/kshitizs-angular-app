import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../dashboard/dashboard.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../users/users.service';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-new-item-dialog',
  standalone: true,
  imports: [FormsModule,CommonModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatSelectModule],
  templateUrl: './new-item-dialog.component.html',
  styleUrls: ['./new-item-dialog.component.css'],
})
export class NewItemDialogComponent {
  taskName: string = '';
  taskDescription: string = '';
  assignedUser:string='';
  isLoading: boolean = false;



  constructor(
    public dialogRef: MatDialogRef<NewItemDialogComponent>,
    private dashboardService: DashboardService,
    private usersService:UsersService
  ) {}

  usersList: string[] = [];
  ngOnInit(): void {
   this.usersService.listUsers().subscribe((response:any[]) => {
     response.forEach((user) => {
       this.usersList.push(user.userName);
     });
   })
  }

  save() {
    if (this.taskName && this.taskDescription) {
      this.isLoading = true;

      const newTask = {
        taskName: this.taskName,
        taskDescription: this.taskDescription,
        assignedUser:this.assignedUser,
      };

      this.dashboardService.createTask(newTask).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.dialogRef.close(response); // Send the created task back to the parent
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Error saving task:', error);
        },
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
