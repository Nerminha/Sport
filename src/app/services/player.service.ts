import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PlayerService {
  playerURL: string = "http://localhost:3000/api/players";
  constructor(private httpClient: HttpClient) {}

  addPlayer(player ,file:File ) {
    let formData=new FormData();
    formData.append("name",player.name);
    formData.append(" age",player. age);
    formData.append("number",player.number);
    formData.append("position",player.position);
    formData.append("tId",player.tId);
    formData.append("img",player.file);
    return this.httpClient.post<{message:string}>(this.playerURL, formData);
  }

  editPlayer(p) {
    return this.httpClient.put<{PlayerIsUpdated:boolean}>(this.playerURL, p);
  }

  getPlayerById(x) {
    return this.httpClient.get<{message:string}>(`${this.playerURL}/${x}`);
  }

  deletePlayerById(id) {
    return this.httpClient.delete(`${this.playerURL}/${id}`);
  }

  getAllPlayers() {
    return this.httpClient.get(this.playerURL);
  }
}
