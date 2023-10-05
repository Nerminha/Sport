import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatchService } from "src/app/services/match.service";

@Component({
  selector: "app-matches-table",
  templateUrl: "./matches-table.component.html",
  styleUrls: ["./matches-table.component.css"],
})
export class MatchesTableComponent implements OnInit {
  pageOfItems: Array<any>;
  matches: any = [];
  title: string = "matches list for :";
  actualDate: Date = new Date();
  constructor(private router: Router, private mService: MatchService) {}

  ngOnInit() {
    this.mService.displayAllMatches().subscribe((response) => {
      console.log("Here response from BE", response);
      this.matches = response.matches;
    });
  }
  goToDisplay(id: number) {
    this.router.navigate([`matchInfo/${id}`]);
  }

  goToEditMatch(id: number) {
    this.router.navigate([`editMatch/${id}`]);
  }

  deleteMatch(id) {
    this.mService.deleteMatchById(id).subscribe((response) => {
      if (response.isDeleted) {
        this.mService.displayAllMatches().subscribe((response) => {
          this.matches = response.matches;
        });
      }
    });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    }
}
