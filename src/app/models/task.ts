export class Task {
    _id: string;
    userId: string;
    title: string;
    details: string;
    createdOn: Date;    
    completed: boolean;    
    completedOn?: Date;
}