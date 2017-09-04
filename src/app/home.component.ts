import { Component, OnInit } from '@angular/core';

import { City } from './city';
import { CityService } from './city.service';
import { CityComponent } from './city.component';

@Component({
    selector:'home',
    templateUrl:'./home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
    cities: City[];
    
      constructor(
        private cityService: CityService
      ) { }
    
      getCities(): void {
        this.cityService.getCities().then(cities => this.cities = cities);
      }
    
      ngOnInit(): void {
        this.getCities();
      }
}