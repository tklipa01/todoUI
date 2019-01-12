import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../models/task';


@Injectable()
export class EventService  { 
    public taskCreatedSubject: Subject<Task>;

    constructor() {
        this.taskCreatedSubject = new Subject<Task>();
    }
}