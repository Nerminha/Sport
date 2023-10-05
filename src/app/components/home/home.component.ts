import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
match:any={id:3,teamOne:"CA",teamTwo:"EST",scoreOne:8,scoreTwo:0};
  constructor() { }
  ngOnInit() {

  }

  

}
