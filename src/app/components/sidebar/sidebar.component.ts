import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public deleteCount: number = 0;
  public todoCount: number = 0;
  public checkLogin: number = 0;
  public checkLogout: number = 0;
  constructor(private todoService: TodoServiceService) { }

  ngOnInit(): void {

    // get count Todo 
    this.todoService.todoCount$.subscribe(res => {
      this.todoCount = res
    })

    // get count Deleted Todo 
    this.todoService.deletedCount$.subscribe(res => {
      this.deleteCount = res
    })

    // checkLogin
    this.todoService.checkLogin$.subscribe(res => {
      this.checkLogin = res
    })

    // checkLogout
    this.todoService.checkLogout$.subscribe(res => {
      this.checkLogout = res
    })

  }
}
