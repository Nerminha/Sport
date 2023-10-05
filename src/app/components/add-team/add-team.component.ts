import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsService } from 'src/app/services/team.service';







@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  btnTitle: string = "Add Team";
  teamForm:FormGroup;
  teamId : any; 
  team : any ={};

  constructor(private teamFormGroup:FormBuilder , private activatedRoute : ActivatedRoute,
     private tService :TeamsService
      , private router : Router) { }

  ngOnInit() {
    this.teamForm=this.teamFormGroup.group({
      name: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(6)]],
      owner: ['',[Validators.required,Validators.minLength(4)]],
      foundation: ['',[Validators.required,Validators.pattern(/^[0-9]{4}$/)]],
      stadium: ['',[Validators.required,Validators.minLength(5)]],
    });
this.teamId=this.activatedRoute.snapshot.paramMap.get('id');
if (this.teamId) {
  this.btnTitle="Edit Team";
 this.tService.getTeamById(this.teamId).subscribe((response)=>{
  console.log("here team by Id response for BE",response.team);
  this.team=response.team;

 });
}
  }
  addOrEditTeam(){
   console.log("this team object is",this.teamForm.value);
   if (this.teamId) {
     this.tService.editTeam(this.team).subscribe((response)=>{
  console.log("here Edit team response for BE",response.isUpdated);
  this.router.navigate(["admin"]);
});
   } else {
    this.tService.addTeam(this.teamForm.value).subscribe((response)=>{
      console.log("here Add team response for BE",response.objectIsAdded);
    });
      
   }
  }
 
}