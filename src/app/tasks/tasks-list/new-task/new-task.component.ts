import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from 'src/app/models/task';
import { EventService } from 'src/app/services/event.service';
import { Subscription } from 'rxjs';



@Component({
    selector: 'new-task',
    templateUrl: './new-task.component.html',
    styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
    @Output() createTaskEventEmitter = new EventEmitter<Task>();

    public task: Task;
    public editing: boolean = false;  
    
    private createdTaskSubscription: Subscription;

    constructor(private eventService: EventService){

    }

    ngOnInit(){
        this.task = new Task();
        this.createdTaskSubscription = this.eventService.taskCreatedSubject.subscribe((_) => {
            this.resetTask();
        });
    }

    ngOnDestroy(): void {
        this.createdTaskSubscription.unsubscribe();
    }

    isEditing(){
        if((this.task.title != undefined && this.task.title != '') || (this.task.title == '' && (this.task.details != undefined && this.task.details != ''))){
            this.editing = true;
            return;
        }
        this.editing = false;
    }

    createTask(){        
        this.createTaskEventEmitter.emit(this.task);
    }

    resetTask(){
        this.editing = false;
        this.task = new Task();
    }
}