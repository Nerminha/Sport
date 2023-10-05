import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allPlayers } from 'src/app/data/playerData';
import { PlayerService } from 'src/app/services/player.service';
import { TeamsService } from 'src/app/services/team.service';



@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  title: string = "Player Form"
  playerForm: FormGroup;
  playerId: any;
  btnTitle: string = "Add Player";
  teamsTab : any =[];
  teamId : any;
  imagePreview :string;
  // playersTable:any=allPlayers;
  player: any = {};
  constructor(private playerFormValue: FormBuilder, private activatedRoute: ActivatedRoute,
     private pService: PlayerService, private router: Router,
    private tService : TeamsService
    ) { }

  ngOnInit() {
    this.playerForm = this.playerFormValue.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      age: ['', [Validators.required, Validators.pattern(/^[0-9]{2}$/)]],
      number: ['', [Validators.required, Validators.min(1)]],
      position: ['', [Validators.required, Validators.minLength(6)]],
      img:[''],
    });
    this.tService. displayAllTeams().subscribe((response)=>{
      console.log("here response get all teams from BE",response.teams);
      this.teamsTab=response.teams;
    })
    this.playerId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.playerId) {
      this.btnTitle = "Edit Player";
      this.pService.getPlayerById(this.playerId).subscribe((response) => {
        console.log("here response recuperer player by Id from BE", response.message);
        this.player = response.message;
      })
    }
  }
  addOrEditPlayer() {
    console.log("this ", this.playerForm.value);
    this.playerForm.value.tId=this.teamId;
    if (this.playerId) {
      this.pService.editPlayer(this.player).subscribe((response) => {
        console.log("here response edit player from BE", response.PlayerIsUpdated);
        this.router.navigate(["admin"]);
      });
     
    } else {
      this.pService.addPlayer(this.playerForm.value,this.playerForm.value.img).subscribe((response) => {
        console.log("here response add player from BE", response.message);
        
      });
    }
   

  }
  selectTeamId(event){
    console.log("here id team" , event.target.value);
    this.teamId=event.target.value;
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.playerForm.patchValue({ img: file });
    this.playerForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }
}