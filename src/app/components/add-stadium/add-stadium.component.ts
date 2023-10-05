import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-stadium",
  templateUrl: "./add-stadium.component.html",
  styleUrls: ["./add-stadium.component.css"],
})
export class AddStadiumComponent implements OnInit {
  stadiumForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.stadiumForm = this.fb.group({
      name: ["", [Validators.required]],
      team: ["", [Validators.required]],
      city: ["", [Validators.required]],
      country: ["", [Validators.required]],
      capacity: ["", [Validators.required]],
    });
  }

  addStadium() {
    console.log("Here object", this.stadiumForm.value);
    let stadiums = JSON.parse(localStorage.getItem("stadiums") || "[]");
    stadiums.push(this.stadiumForm.value);
    localStorage.setItem("stadiums", JSON.stringify(stadiums));
  }
}
