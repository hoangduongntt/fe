import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listSearch: any;
  public isLogin : number = 0;
  constructor(private todoService: TodoServiceService , public router : Router ) { }

  ngOnInit(): void {
    this.todoService.checkLogin$.subscribe(res => {
      this.isLogin = res
      console.log(res);
      
    })
  }
  searchByName(name: string)
  {
    this.todoService.searchByName(name);
  }
  logout(){
      if (localStorage.getItem('user')) {
        if (confirm("Do you want to Logout ?") == true) {
        localStorage.removeItem('user');
        this.router.navigate(['home']);
        this.todoService.checkLogout$.next(1);
        this.todoService.checkLogin$.next(0);
      }
    }
  }
}
