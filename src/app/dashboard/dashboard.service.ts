import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardData {
  id: number;
  taskName: string;
  taskDescription: string;
  createdDate: string;
  status: string;
  assignedUser:string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiDashboardDataUrl = 'http://localhost:8080/dashboard-data'; // Replace with your API URL
  private apiCreateTaskUrl = 'http://localhost:8080/create-task';
  private updateTaskUrl = 'http://localhost:8080/update-task';
  private sendReminderUrl = 'http://localhost:8080/send-reminder';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<DashboardData[]> {
    return this.http.get<DashboardData[]>(this.apiDashboardDataUrl);
  }

  createTask(task: any): Observable<any> {
    return this.http.post(this.apiCreateTaskUrl, task);
  }

  updateTask(task: any): Observable<any> {
    return this.http.post(this.updateTaskUrl, task);
  }

  sendReminder(id: number): Observable<any> {
    const url = `${this.sendReminderUrl}/${id}`; // Append id to the URL
    return this.http.get<string>(url);
  }
}
