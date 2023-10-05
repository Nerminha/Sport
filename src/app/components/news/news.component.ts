import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
p:any={name:"ali",age:"28"}
  constructor() { }

  ngOnInit() {
  }

}
