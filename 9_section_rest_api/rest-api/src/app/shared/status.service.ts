import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private url = '/api/todo';

  constructor(
    private http: HttpClient
  ) {}

  getTodos(): Observable<any> {
    return this.http.get(this.url);
  }

  createTodo(title: string): Observable<{todo: todo}> {
    return this.http.post<{todo: todo}>(this.url, {title});
  }
}

export interface todo {
  title: string,
  id: number,
  done: boolean,
  createdAt: string,
  updatedAt: string
}
