import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskList } from 'src/app/models/tasks-list';
import { RightSlideOut } from 'src/app/animations/animations';

@Component({
    selector: 'tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.scss'],
    animations: [RightSlideOut]
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
        this.tasks.find(t => t._id === id).animState = 'complete';
        this.completeTaskEventEmitter.emit(id);
    }

    deleteTaskHandler(id: string): void {   
        this.tasks.find(t => t._id === id).animState = 'remove';       
        this.deleteTaskEventEmitter.emit(id);
    }

    deleteAllCompleted(): void {
        if(!confirm(`Are you sure you want to clear all completed tasks?`)) return;
        this.tasks.forEach(t => t.animState = 'removeAll');
        this.deleteAllCompletedEventEmitter.emit();
    }

    createTaskHandler(task: Task) {
        this.createTaskEventEmitter.emit(task);
    }
}