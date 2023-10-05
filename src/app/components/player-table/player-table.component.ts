import { Component, OnInit } from '@angular/core';
import { allPlayers } from 'src/app/data/playerData';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit {
players:any=[];
  constructor() { }

  ngOnInit() {
    this.players=allPlayers;
  }

}
