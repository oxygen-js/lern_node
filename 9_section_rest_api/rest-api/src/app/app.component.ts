import {Component, OnInit} from '@angular/core';
import {map, observable, Observable, Subject} from 'rxjs';
import {StatusService, todo} from './shared/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todoName = "";
  todos!: {todos: todo[]};

  constructor(private _statusService: StatusService) {
  }

  ngOnInit(): void {
    this._statusService.getTodos().subscribe(x => this.todos = x);
    console.log(this.todos)
  }

  create() {
    this._statusService.createTodo(this.todoName.trim())
      .pipe(map(x => x.todo))
      .subscribe(x => this.todos.todos.push(x));
  }
}
