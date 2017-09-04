import { Injectable } from '@angular/core';

import { City } from './city';
import { CITIES } from './mock-cities';

@Injectable()
export class CityService {
	getCities(): Promise<City[]> {
		return Promise.resolve(CITIES);
	}

	getCity(name: string):Promise<City> {
		return this.getCities()
		.then(cities => cities.find(city => city.name == name));
	}
}