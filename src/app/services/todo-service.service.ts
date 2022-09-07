import { EventEmitter, Injectable } from '@angular/core';
import { Todo } from '../models/Todo.class';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams,  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  public API: string = 'http://localhost:8080/api/v1/'
  public todos : Todo[] = [];
  public todoFilter : Todo[] = [];
  public todo! : Todo;
  public search= new EventEmitter();
  public searchDeleted= new EventEmitter();
  public todoSearch: any;
  public todoDeletedSearch: any;
  public href : any;
  public todoCount$ = new BehaviorSubject<number> (0);
  public deletedCount$ = new BehaviorSubject<number> (0);
  public checkLogin$ = new BehaviorSubject<number> (0);
  public checkLogout$ = new BehaviorSubject<number> (0);
  constructor(private http : HttpClient) { }
  
  // Get Todo List
  getTodoList (){
    return this.http.get(this.API) as Observable<any>;
  }

  // Upsert Todo
  UpsertTodo(todo : Todo){
    return this.http.post(this.API + 'upsert', todo) as Observable<any>;
   
  }

  // Delete Todo
  deleteTodo(id : number) : Observable<any>{
    return this.http.delete(this.API+'delete/' +id) as Observable<any>;
  }

  // get Deleted TodoList
  getDeletedTodoList() {
    return this.http.get(this.API +'deletedList') as Observable<any>;
  }
  
   // get Todo By ID
  getTodoById(id : number){
    return this.http.get(this.API + id) as Observable<any>;
  }

   // Search By Name
  searchByName(name : string){
    const params = new HttpParams().set('name', name.trim());
    if(this.href == '/todo') {
      (this.http.get(this.API + 'search', {params}) as Observable<any>).subscribe((res)=>{
        this.todoSearch = res.item as Observable<any>;
        this.search.emit();
      });
      return  (this.http.get(this.API + 'search', {params}) as Observable<any>);

    } else{
      (this.http.get(this.API + 'searchDeleted', {params}) as Observable<any>).subscribe((res)=>{
        this.todoDeletedSearch = res.item as Observable<any>;
        this.searchDeleted.emit();
      });
      return  (this.http.get(this.API + 'searchDeleted', {params}) as Observable<any>);
    }
    
  }

}
