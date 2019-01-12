import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';


@Component({
    selector: 'task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent {
    @Input() task: Task;
    @Output() completeTaskEventEmitter = new EventEmitter<string>();
    @Output() deleteTaskEventEmitter = new EventEmitter<string>();

    completeTask(id: string): void {
        this.completeTaskEventEmitter.emit(id);
    }

    deleteTask(id: string): void {
        if(confirm(`Are you sure you want to delete this task?`)){
            this.deleteTaskEventEmitter.emit(id);
        }
    }

    editTask(task: Task): void {
        alert("Not implemented yet!");
    }
}