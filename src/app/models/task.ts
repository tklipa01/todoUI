export class Task {
    _id: string;
    userId: string;
    title: string;
    details: string;
    createdOn: Date;    
    completed: boolean;    
    completedOn?: Date;

    animState: string;

    constructor(init?: Partial<Task>) {
        Object.assign(this, init);
        if(init){
            this.createdOn = new Date(init.createdOn);
        }
    }
}