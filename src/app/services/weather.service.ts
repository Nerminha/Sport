import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
 // teamURL : Backend address
 weatherURL: string = "http://localhost:3000/weather";
 // http :Livreur\boustagi
 constructor(private httpClient: HttpClient) { }
 displayWeather(city:string) {
  return this.httpClient.post<{weather:any}>(this.weatherURL,city );
}

}
