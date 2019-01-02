import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TodoApiService } from '../services/todo-api.service';
import { Task } from '../models/task';


@Component({
    selector: 'tasks',
    templateUrl: './tasks.component.html'
})
export class TasksComponent {
    public tasks: Task[];

    constructor(public auth: AuthService, private todoApi: TodoApiService){

    }

    async ngOnInit(){ 
        this.tasks = await this.todoApi.getAllTasks();
    }
}