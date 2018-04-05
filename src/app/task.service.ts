import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Task } from './task';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TaskService {
  
  private tasksUrl = 'api/tasks';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getTasks (): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        tap(tasks => this.log(`fetched tasks`)),
        catchError(this.handleError('getTasks', []))
      );
  }

  getTaskNo404<Data>(priority: number): Observable<Task> {
    const url = `${this.tasksUrl}/?priority=${priority}`;
    return this.http.get<Task[]>(url)
      .pipe(
        map(tasks => tasks[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `dpriority not find`;
          this.log(`${outcome} task priority=${priority}`);
        }),
        catchError(this.handleError<Task>(`getTask priority=${priority}`))
      );
  }

  getTask(priority: number): Observable<Task> {
    const url = `${this.tasksUrl}/${priority}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task priority=${priority}`)),
      catchError(this.handleError<Task>(`getTask priority=${priority}`))
    );
  }

  updateTask (task: Task): Observable<any> {
      return this.http.put(this.tasksUrl, task, httpOptions).pipe(
        tap(_ => this.log(`updated task priority=${task.priority}`)),
        catchError(this.handleError<any>('updateTask'))
      );
    }

    addTask (task: Task): Observable<Task> {
      return this.http.post<Task>(this.tasksUrl, task, httpOptions).pipe(
        tap((task: Task) => this.log(`added task w/ priority=${task.priority}`)),
        catchError(this.handleError<Task>('addTask'))
      );
    }

    deleteTask (task: Task | number): Observable<Task> {
      const priority = typeof task === 'number' ? task : task.priority;
      const url = `${this.tasksUrl}/${priority}`;

      return this.http.delete<Task>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted task priority=${priority}`)),
        catchError(this.handleError<Task>('deleteTask'))
      );
    }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('TaskService: ' + message);
  }

}
