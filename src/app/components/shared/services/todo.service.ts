import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
private urlApiTodos = environment.urlApi+'/todos'

  public todos$ = new BehaviorSubject<Todo[]>([]);
  

  constructor(
    private http: HttpClient
  ) {
    this.getTodos();
  }

  public getTodos() {
    this.http
      .get<Todo[]>(this.urlApiTodos)
      .subscribe(todos => this.todos$.next(todos));
  }

  public createTodo(todo:Todo){
    
    this.http
    .post<Todo>(this.urlApiTodos,todo)
    //... reste operateur permet d etaler le tableau de tableau
    .subscribe(todo => this.todos$.next([...this.todos$.value,todo]));

  }
}

