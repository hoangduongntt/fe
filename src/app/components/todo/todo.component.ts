import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Todo } from 'src/app/models/Todo.class';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public todoForm!: FormGroup;
  public todos: Todo[] = [];
  public todo!: Todo;
  public inputName: string = "";
  public isSave: boolean = true;
  public count: number = 0;
  public amount: number = 0;
  public href : string = '';
  public subscription!: Subscription;

  constructor(private fb: FormBuilder, 
              private todoService: TodoServiceService,
              private router : Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.todoService.search.subscribe(()=>
    {
      this.todos=this.todoService.todoSearch;
    }),
   
    // define form 
    this.todoForm = this.fb.group({
      id: '',
      taskName: '',
      description: '',
      deleteFlag: ''
    }),
      // get elements in form 
      this.loadData();
      this.todoService.hef = this.router.url;
  }

  // Load data
  loadData() {
    this.subscription = this.todoService.getTodoList().subscribe(data => {
      this.todos = data.item;
      this.todoService.todoCount$.next(this.todos.length);
      
    });
  }

  // Add and Update Todo 
  submitForm() {
    if (this.isSave) {
      this.todo = this.todoForm.value;
      this.todo.deleteFlag=false;
      this.todo.id = this.getLastId(this.todos);
      this.subscription = this.todoService.UpsertTodo(this.todo).subscribe(data => {
        this.loadData();
      });
    } else {
      this.todo = this.todoForm.value;
      this.subscription = this.todoService.UpsertTodo(this.todo).subscribe(data => {
        this.loadData();
      });
      this.isSave = true;
    }
    this.todoForm.reset();
  }

  // Edit By id
  editTodo(id: any) {
    this.isSave = false;
    this.subscription = this.todoService.getTodoById(id).subscribe((data: any) => {
      this.todoForm.controls['taskName'].setValue(data.item.taskName);
      this.todoForm.controls['description'].setValue(data.item.description);
      this.todoForm.controls['id'].setValue(data.item.id);
      this.todoForm.controls['deleteFlag'].setValue(data.item.deleteFlag);
    })

  }

  // Delete By id
  deleteTodo(id: number) {
    if (confirm("Do you want to delete this Todo ?") == true) {
      this.subscription = this.todoService.deleteTodo(id).subscribe(data => {
        this.loadData();
      })
    } 
  }

  // // get Deleted TodoList
  // getDeletedTodoList() {
  //   this.subscription = this.todoService.getDeletedTodoList().subscribe(data => {
  //     this.todos = data.item;
  //     this.amount = this.todos.length;
  //   });
  // }
 

  // get Last ID
  getLastId(todos: any) {
    let lastID = todos.length > 0 ? todos.sort((a: any, b: any) => {
      if (a.id > b.id) return -1;
      if (a.id < b.id) return 1;
      else return 0;
    })[0].id + 1 : 1;
    return lastID;
  }
  // handleParams(){
  //   let name = this.activatedRouter.snapshot.params[''];
  //     console.log(name);

  // }
}

