import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { DeletedTodoComponent } from './components/deleted-todo/deleted-todo.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
  const routes: Routes = [
    {
      path : '',
      redirectTo :'/home',
      pathMatch :'full'
    },
    {
      path: 'home',
      component: HomeComponent,
   },
    {
       path: 'todo',
       component: TodoComponent,
       canActivate : [AuthGuard]
    },
    {
      path:'deletedTodo',
      component : DeletedTodoComponent,
      canActivate : [AuthGuard]
    },
    {
      path:'login',
      component : LoginComponent,
    },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
