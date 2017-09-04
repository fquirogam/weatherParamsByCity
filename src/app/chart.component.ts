import { Component, Input, OnChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { City } from './city';

@Component({
    selector: 'chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css'],
    providers: [DatePipe],
})
export class ChartComponent {

    today: number = Date.now() / 1000;
    fourDaysAfter: number;
    cityWeather: string[];

    /* START COMMONCHART VARIABLES */
    commonChartLabels: Array<any> = [];
    commonChartOptions: any = {
        responsive: true
    };
    commonChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    commonChartLegend: boolean = true;
    commonChartType: string = 'line';
    /* END COMMONCHART VARIABLES */

    /* START TEMPCHART VARIABLES */
    tempDataAvailable: boolean = false;
    tempChartData: Array<any> = [];
    /* END TEMPCHART VARIABLES */


    /* START HUMIDITYCHART VARIABLES */
    humidityDataAvailable: boolean = false;
    humidityChartData: Array<any> = [];
    /* END HUMIDITYCHART VARIABLES */

    /* START PRESSURECHART VARIABLES */
    pressureDataAvailable: boolean = false;
    pressureChartData: Array<any> = [];
    /* END PRESSURECHART VARIABLES */

    /* START WINDSPEEDCHART VARIABLES */
    windSpeedDataAvailable: boolean = false;
    windSpeedChartData: Array<any> = [];
    /* END WINDSPEEDCHART VARIABLES */

    constructor(
        private http: HttpClient,
        private datePipe: DatePipe
    ) { }

    @Input() city: City;

    getCityWeather(city: string, country: string): void {
        let self = this;

        this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + country + '&units=metric&appid=2e8c3ba657f77eb8da13f27c97cfd784')
            .subscribe(function (response) {
                self.cityWeather = response['list'];
                self.cityWeather = self.cityWeather.filter(state => state['dt'] < self.fourDaysAfter);
                console.log(self.cityWeather);
                self.fillChartsData();
            });
    }


    fillChartsData(): void {
        this.resetCharts();

        let temperature: number[] = [];
        let humidity: number[] = [];
        let pressure: number[] = [];
        let windSpeed: number[] = [];

        for (let state of this.cityWeather) {
            let date = new Date(state['dt_txt']);
            this.commonChartLabels.push(date.getDate() + '/' + (date.getMonth() + 1) + ' ' + date.getHours() + 'h.');
            temperature.push(Math.round(state['main']['temp']));
            humidity.push(Math.round(state['main']['humidity']));
            pressure.push(state['main']['pressure']);
            windSpeed.push(state['wind']['speed']);

        }

        console.log(this.tempChartData);

        //tempChart
        this.tempChartData.push({ data: temperature, label: 'Temperature' });
        this.tempDataAvailable = true;

        //humidityChart
        this.humidityChartData.push({ data: humidity, label: 'Humidity' });
        this.humidityDataAvailable = true;

        //pressureChart
        this.pressureChartData.push({ data: pressure, label: 'Pressure' });
        this.pressureDataAvailable = true;

        //windSpeedChart
        this.windSpeedChartData.push({ data: windSpeed, label: 'Wind Speed' });
        this.windSpeedDataAvailable = true;
    }

    resetCharts(): void{
         /* EMPTY ALL CHARTS ARRAYS */
         this.commonChartLabels = [];
         this.tempChartData = [];
         this.tempDataAvailable = false;
         this.humidityChartData = [];
         this.humidityDataAvailable = false;
         this.pressureChartData = [];
         this.pressureDataAvailable = false;
         this.windSpeedChartData = [];
         this.windSpeedDataAvailable = false;
    }

    ngOnChanges(): void {
        this.fourDaysAfter = new Date((this.today + 3600 * 24 * 4) * 1000).setHours(0, 0, 0, 0) / 1000;

        this.getCityWeather(this.city.name, this.city.country);
    }
}