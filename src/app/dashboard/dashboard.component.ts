import { Component, OnInit } from '@angular/core';
import { DashboardService, DashboardData } from './dashboard.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { NewItemDialogComponent } from '../new-item-dialog/new-item-dialog.component';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { SessionService } from '../session.service';
import { Router } from '@angular/router'; // Import Router
import { response } from 'express';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from '../app.component';






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true, 
  imports: [MatInputModule, MatButtonModule,MatIconModule,MatCardModule,FormsModule,MatTableModule,MatToolbarModule,CommonModule,MatGridListModule],
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['id', 'taskName', 'taskDescription', 'createdDate','status','assignedUser','comments','actions'];

  dashboardData: DashboardData[] = [];

  constructor(private router: Router,private dashboardService: DashboardService, public dialog: MatDialog, private sessionService : SessionService,private appComponent:AppComponent) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe((data) => {
      this.dashboardData = data;
    });
    this.appComponent.setProfileDetails();
  }

  openNewItemDialog() {
    
    const dialogRef = this.dialog.open(NewItemDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: DashboardData[]) => {
      if (result) {
        this.loadData(result);
      }
    });
  }

  editTask(task: any) {
    
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '400px',
      data: { ...task }, // Pass the task data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Call your update API here
        this.updateTask(result);
      }
    });
  }

  updateTask(updatedTask: any) {
    this.dashboardService.updateTask(updatedTask).subscribe((result: DashboardData[]) => {
      //console.log('Loading response')
      this.loadData(result); // Reload the data after the update
    });
  }
  loadData(result: DashboardData[]) {
    this.dashboardData = result;
  }

  logout(): void {
    this.sessionService.clearSession();
    this.router.navigate(['/login']);
  }

  sendReminder(task: any) {
    this.dashboardService.sendReminder(task.id).subscribe((result: any) => {
      if(result.result){
        alert(result.responseMessage);
      }
     
    });
  }

}
