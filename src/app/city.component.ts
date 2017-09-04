import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { City } from './city';
import { CityService } from './city.service';


import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

    cities: City[];
    cityWeather: string[];

    constructor(
        private cityService: CityService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    @Input() city: City;

    getCities(): void {
        this.cityService.getCities().then(cities => this.cities = cities);
    }

    ngOnInit(): void {
        let self = this;

        this.getCities();

        this.route.paramMap
        .switchMap((params: ParamMap) => this.cityService.getCity(params.get('name')))
        .subscribe(function(city){
            self.city = city;
        });        
    }
}