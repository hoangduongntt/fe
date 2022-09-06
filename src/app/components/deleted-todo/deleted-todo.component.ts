import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { Todo } from 'src/models/Todo.class';

@Component({
  selector: 'app-deleted-todo',
  templateUrl: './deleted-todo.component.html',
  styleUrls: ['./deleted-todo.component.css']
})
export class DeletedTodoComponent implements OnInit {
  public todos: Todo[] = [];
  public count : number = 0;
  public subscription!: Subscription;
  public deletedCount: number = 0;
  public href : string = '';

  constructor(private todoService: TodoServiceService, private router : Router) { }

  ngOnInit(): void {

    // load Data
    this.getDeletedTodoList(); 
    // search By Name
    this.todoService.searchDeleted.subscribe(()=>
    {
      this.todos=this.todoService.todoDeletedSearch;
    })
    // get href
    this.todoService.href = this.router.url; 
  }

// get Deleted TodoList
  getDeletedTodoList() {
  this.subscription = this.todoService.getDeletedTodoList().subscribe(data => {
    this.todos = data.item;
    this.todoService.deletedCount$.next(this.todos.length);
    this.count = this.todos.length;
  });
}
}
