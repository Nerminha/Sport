import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { allMatches } from "src/app/data/matcheData";
import { MatchService } from "src/app/services/match.service";

@Component({
  selector: "app-match-form",
  templateUrl: "./match-form.component.html",
  styleUrls: ["./match-form.component.css"],
})
export class MatchFormComponent implements OnInit {
  title: string = "Match Form";
  matchForm: FormGroup;
  match: any = {};
  id: number;
  btnTitle: string = "Add Match";
  // import allMatches
  matchesTable: any = allMatches;
  constructor(
    private activatedRoute: ActivatedRoute,
    private mService: MatchService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.id = +this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.btnTitle = "Edit Match";
      // Search Match By ID
      this.mService.getMatchById(this.id).subscribe((response) => {
        console.log("Here response from BE", response.match);
        this.match = response.match;
      });
    }
  }
  addOrEditMatch() {
    console.log("this match", this.match);
    if (this.id) {
      this.mService.editMatch(this.match).subscribe((response) => {
        console.log("Here response from BE", response.isUpdated);
        this.router.navigate(["admin"]);
      });
    } else {
      this.mService.addMatch(this.match).subscribe((response) => {
        console.log("Here response from BE", response);
      });
    }
  }
}
