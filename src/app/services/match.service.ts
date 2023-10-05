import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MatchService {
  // matchURL : Backend Address
  matchURL: string = "http://localhost:3000/matches";
  // http : Livreur/Boustagi
  constructor(private http: HttpClient) {}

  // Request : Array of Objects
  displayAllMatches() {
    return this.http.get<{ matches: any }>(this.matchURL);
  }

  // Request : One Object
  getMatchById(id: number) {
    // return this.http.get(this.matchURL + "/" + id);
    return this.http.get<{ match: any }>(`${this.matchURL}/${id}`);
  }

  // Request : Boolean
  addMatch(obj: any) {
    return this.http.post<{ isAdded: boolean }>(this.matchURL, obj);
  }

  // Request : Boolean
  deleteMatchById(id: number) {
    return this.http.delete<{ isDeleted: boolean }>(`${this.matchURL}/${id}`);
  }

  // Request : Boolean/String
  editMatch(obj) {
    return this.http.put<{ isUpdated: boolean }>(this.matchURL, obj);
  }
  // searchMatchesByScores() {}
}
