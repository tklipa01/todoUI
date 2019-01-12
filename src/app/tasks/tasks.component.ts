import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TodoApiService } from '../services/todo-api.service';
import { Task } from '../models/task';
import { TaskList } from '../models/tasks-list';
import { EventService } from '../services/event.service';


@Component({
    selector: 'tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
    public activeTasks: Task[];
    public completedTasks: Task[];
    public loadingTasks: boolean = true;

    public selectedTab: TaskList;
    public taskListEnum = TaskList;

    constructor(public auth: AuthService, private todoApi: TodoApiService, private eventService: EventService){

    }

    async ngOnInit(){ 
        this.selectedTab = TaskList.Active;
        try {
            let tasks = await this.todoApi.getAllTasks(this.auth.userProfile.sub);        
            this.activeTasks = tasks.filter(t => !t.completed);
            this.completedTasks = tasks.filter(t => t.completed);
        } catch(err) {
            console.error(`Failed to load tasks!`);
        } finally {
            this.loadingTasks = false;
        }        
    }

    async completeTaskHandler(id: string): Promise<void> {
        this.loadingTasks = true;
        try {            
            await this.todoApi.updateTask(id, new Task({completed: true, completedOn: new Date()}));
            let completedTask = this.activeTasks.find(t => t._id === id);
            completedTask.completed = true;
            this.activeTasks = this.activeTasks.filter(t => t._id !== id);
            this.completedTasks.unshift(completedTask);
        } catch(err) {
            console.error(`Failed to complete task!`);
        } finally {
            this.loadingTasks = false;
        }
    }

    async deleteTaskHandler(id: string): Promise<void> {
        this.loadingTasks = true;
        try {
            await this.todoApi.deleteTask(id);
            this.activeTasks = this.activeTasks.filter(t => t._id !== id);
        } catch(err) {
            console.error(`Failed to delete task!`);
        } finally {
            this.loadingTasks = false;
        }
    }

    async deleteAllCompletedHandler(): Promise<void> {
        this.loadingTasks = true;
        try {
            await this.todoApi.deleteAllCompleted(this.auth.userProfile.sub);
            this.completedTasks = [];
        } catch(err) {
            console.error(`Failed to delete all completed tasks!`);
        } finally {
            this.loadingTasks = false;
        }
    }

    async createTaskHandler(task: Task): Promise<void> {
        this.loadingTasks = true;
        try {
            task.userId = this.auth.userProfile.sub;
            task.createdOn = new Date();
            var createdTask = await this.todoApi.createTask(task);
            this.activeTasks.push(createdTask);
            this.eventService.taskCreatedSubject.next(createdTask);
        } catch(err) {
            console.error(`Failed to create task!`);
        } finally {
            this.loadingTasks = false;
        }
    }

    switchTab() {
        if(this.selectedTab === TaskList.Active){
            this.selectedTab = TaskList.Completed;
        } else {
            this.selectedTab = TaskList.Active;
        }
    }
}