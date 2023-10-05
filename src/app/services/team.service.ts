import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

 
   // teamURL : Backend address
   teamURL: string = "http://localhost:3000/teams";
   // http :Livreur\boustagi
   constructor(private http: HttpClient) { }
 
   // Request : Array of Objects
   displayAllTeams() {
     return this.http.get<{ teams: any }>(this.teamURL)
   }
  // Request : Array of Objects
  displayAllPlayersTeam(id : number) {
    return this.http.get<{ teamPlayers: any }>(this.teamURL)
  }
   // Request : one object
   getTeamById(id: number) {
     return this.http.get<{ team: any}>(`${this.teamURL}/searchById/${id}`);
     
   }
   // Request : Boolean
   addTeam(obj: any) {
     return this.http.post<{ objectIsAdded: boolean}>(this.teamURL, obj);
   }
   // Request : Boolean
   deleteTeam(id : number) { 
     return this.http.delete<{TeamIsDeleted : boolean }>(`${this.teamURL}/deleteById/${id}`)
   }
   // Request: Boolean/String
   editTeam(obj : any) {
     return this.http.put<{ isUpdated: boolean}>(this.teamURL, obj);
    }
    
  
  }
