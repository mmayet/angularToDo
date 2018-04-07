import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Task } from './task';
//import { TASKS } from './mock-tasks';
import { MessageService } from './message.service';
 
@Injectable()
export class TaskService {

  private tasksUrl = './in-memory-data.service.ts';
  //private tasksUrl = 'api/tasks';

  constructor(
  	private http: HttpClient,
  	private messageService: MessageService) { }
 
  getTasks(): Observable<Task[]> {
  	//return of(TASKS);
    return this.http.get<Task[]>(this.tasksUrl);
  }
 
  getTask(id: number): Observable<Task> {
    //this.messageService.add(`TaskService: fetched task id=${id}`);
    //return of(TASKS.find(task => task.id === id));
    const url = `${this.tasksUrl}/${id}`;
  	return this.http.get<Task>(url);
  }

  private log(message: string) {
    this.messageService.add('TaskService: ' + message);
  }
}