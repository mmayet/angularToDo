import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Task } from '../task';
import { TaskService }  from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @Input() task: Task;

  constructor(
  	private route: ActivatedRoute,
	private taskService: TaskService,
	private location: Location
  ) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const priority = +this.route.snapshot.paramMap.get('priority');
    this.taskService.getTask(priority)
      .subscribe(task => this.task = task);
  }

  save(): void {
   this.taskService.updateTask(this.task)
     .subscribe(() => this.goBack());
 }

  goBack(): void {
    this.location.back();
  }

}
