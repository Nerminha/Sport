import { Component, OnInit } from '@angular/core';
import { allTeams } from 'src/app/data/teamData';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
teams:any=[];
  constructor() { }

  ngOnInit() {
    this.teams=allTeams;
  }

}
