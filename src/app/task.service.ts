import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
 
import { Task } from './task';
import { TASKS } from './mock-tasks';
import { MessageService } from './message.service';
 
@Injectable()
export class TaskService {
 
  constructor(private messageService: MessageService) { }
 
  getTasks(): Observable<Task[]> {
    this.messageService.add('TaskService: fetched tasks');
    return of(TASKS);
  }
 
  getTask(id: number): Observable<Task> {
    this.messageService.add(`TaskService: fetched task id=${id}`);
    return of(TASKS.find(task => task.id === id));
  }
}