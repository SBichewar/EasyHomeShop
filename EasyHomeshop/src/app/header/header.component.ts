import { Component, OnInit,Input,NgModule } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Input()PageHeader:"";
  constructor() { }

  ngOnInit() {
   
  }

}
