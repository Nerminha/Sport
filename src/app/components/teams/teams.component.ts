import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
title:string="Teams";
teams:any=[];
  constructor() { }

  ngOnInit() {
    this.teams=[
      {id:1,name:"fcb",owner:"jack grealich",foundation:"1905",staduim:"campno"},
      {id:2,name:"manU",owner:"erling halaand",foundation:"1910",staduim:"manchester"},
      {id:3,name:"CA",owner:"med bouraoui",foundation:"1920",staduim:"rades"},
    ]
  }

}
