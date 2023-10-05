import { Component, OnInit } from '@angular/core';
import { allMatches } from 'src/app/data/matcheData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  title:string="Matches"
 matches:any=[];
  constructor(private mService:MatchService) { }

  ngOnInit() {
    // this.matches=allMatches;
    this.mService.displayAllMatches().subscribe(
      (matchesResponse)=>{
        
        this.matches=matchesResponse.matches
        
      }
    )
  }
  updateMatches(T){
    this.matches=T;
  }
}
