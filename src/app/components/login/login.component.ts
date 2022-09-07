import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error : number = 0;
 
  constructor( private router : Router, private todoService: TodoServiceService) { }

  ngOnInit(): void {
    this.checkLogin();
  }
  checkLogin (){
    if(localStorage.getItem('user')){
      this.router.navigate(['todo']);
    }
  }
  onLogin(userName : string, passWord : string){
    let user = {
      userName : userName,
      passWord : passWord
    };
    if(userName=='admin'&&passWord=='admin'){
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['todo']);
      this.todoService.checkLogin$.next(1);
    }else{
      this.error = -1;
    }
  }
}
