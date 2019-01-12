import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskList } from 'src/app/models/tasks-list';

@Component({
    selector: 'tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {
    @Input() tasks: Task[]; 
    @Input() type: TaskList;
    @Output() completeTaskEventEmitter = new EventEmitter<string>();
    @Output() deleteTaskEventEmitter = new EventEmitter<string>();
    @Output() deleteAllCompletedEventEmitter = new EventEmitter<void>();
    @Output() createTaskEventEmitter = new EventEmitter<Task>();    

    public taskListEnum = TaskList;

    completeTaskHandler(id: string): void {
        this.completeTaskEventEmitter.emit(id);
    }

    deleteTaskHandler(id: string): void {
        this.deleteTaskEventEmitter.emit(id);
    }

    deleteAllCompleted(): void {
        if(!confirm(`Are you sure you want to clear all completed tasks?`)) return;
        this.deleteAllCompletedEventEmitter.emit();
    }

    createTaskHandler(task: Task) {
        this.createTaskEventEmitter.emit(task);
    }
}