import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { map } from 'rxjs/operators';

@Injectable()
export class TodoApiService  { 

    private baseUrl = 'http://localhost:8080/';

    constructor(private http: HttpClient){
    }

    getAllTasks(userId: string = null): Promise<Task[]> {        
        return this.http.get<Task[]>(`${this.baseUrl}tasks${userId ? '?userId=' + userId : ''}`).pipe(map(tasks => tasks.map(t => new Task(t)))).toPromise();
    }

    getTask(id: string): Promise<Task> {
        return this.http.get<Task>(`${this.baseUrl}tasks/${id}`).toPromise();
    }

    createTask(task: Task): Promise<Task> {
        return this.http.post<Task>(`${this.baseUrl}tasks`, task).toPromise();
    }

    updateTask(id: string, task: Task): Promise<void> {
        return this.http.put<void>(`${this.baseUrl}tasks/${id}`, task).toPromise();
    }

    deleteTask(id: string): Promise<void> {
        return this.http.delete<void>(`${this.baseUrl}tasks/${id}`).toPromise();
    }

    deleteAllCompleted(userId: string): Promise<void> {
        return this.http.delete<void>(`${this.baseUrl}tasks?userId=${userId}`).toPromise();
    }
}