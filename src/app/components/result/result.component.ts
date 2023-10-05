import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatchService } from "src/app/services/match.service";
import jwt_decode from "jwt-decode"
@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"],
})
export class ResultComponent implements OnInit {
  @Input() result: any;
  @Output() newMatches:EventEmitter<any>=new EventEmitter();
  user ;
  constructor(
    private matchServer:MatchService
  ) {}

  ngOnInit() {
    let sessionToken=sessionStorage.getItem("token");
    if (sessionToken) {
      this.user=this.decodeJWT(sessionToken);
    }
  }

  scoreColor(sc1: number, sc2: number) {
    if (sc1 > sc2) {
      return ["green", "Win"];
    } else if (sc1 < sc2) {
      return ["orange", "Loss"];
    } else {
      return ["blue", "Draw"];
    }
  }
  deleteMatch(id){
    this.matchServer.deleteMatchById(id).subscribe(
      (reponse)=>{
        if (reponse.isDeleted) {
          console.log("here response delete",reponse.isDeleted);
        this.matchServer.displayAllMatches().subscribe(
          (res)=>{
            console.log("here res from BE",res.matches);
            this.newMatches.emit(res.matches);
          }
        )
        }
        
      }
      );
  }
  decodeJWT(token:string){
    return jwt_decode(token);
  }
}
