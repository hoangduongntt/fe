import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { DeletedTodoComponent } from './components/deleted-todo/deleted-todo.component';
  const routes: Routes = [
    {
      path : '',
      redirectTo :'/home',
      pathMatch :'full'
    },
    {
       path: 'home',
       component: TodoComponent
    },
    {
      path:'deletedTodo',
      component : DeletedTodoComponent,
    },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
