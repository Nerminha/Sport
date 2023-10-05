import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { WeatherService } from 'src/app/services/weather.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  title: string = "Weather";
  weatherForm: FormGroup;
  weather: any;
  dataWeather:any;
  constructor(
    private formBuilder: FormBuilder,
    private wService: WeatherService,

  ) { }

  ngOnInit() {
    this.weatherForm = this.formBuilder.group({
      adresse: ["", [Validators.required]],
    })

  }
  displayCity() {
    this.wService.displayWeather(this.weatherForm.value).subscribe(
      (respnse) => {
        console.log(respnse.weather);
        this.dataWeather=respnse.weather
      }
    )
  }
}
