import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listSearch: any;
  constructor(private todoService: TodoServiceService) { }

  ngOnInit(): void {
    //this.todoService.searchByName().
  }
  searchByName(name: string)
  {
    this.todoService.searchByName(name);
  }

}
