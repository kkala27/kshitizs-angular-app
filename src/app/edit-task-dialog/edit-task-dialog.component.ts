
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DashboardService } from '../dashboard/dashboard.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  standalone: true,
  imports: [FormsModule,CommonModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatSelectModule],
  styleUrls: ['./edit-task-dialog.component.css'],
})
export class EditTaskDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService:UsersService
  ) {}

  statuses = [
    { value: 'CREATED', viewValue: 'Created' },
    { value: 'ACTIVE', viewValue: 'Active' },
    { value: 'INACTIVE', viewValue: 'Inactive' },
    { value: 'DRAFT', viewValue: 'Draft' },
    { value: 'ARCHIVED', viewValue: 'Archived' },
    { value: 'DELETED', viewValue: 'Deleted' },
  ];

   usersList: string[] = [];
   ngOnInit(): void {
    this.usersService.listUsers().subscribe((response:any[]) => {
      response.forEach((user) => {
        this.usersList.push(user.userName);
      });
    })
   }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data); // Send the updated data back
  }
}
