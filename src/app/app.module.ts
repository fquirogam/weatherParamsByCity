import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CityService } from './city.service';
import { CityComponent } from './city.component';
import { HomeComponent } from './home.component';
import { ChartComponent } from './chart.component';

import { ChartsModule } from 'ng2-charts';

const appRoutes: Routes = [
  { path: 'city/:name', component: CityComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CityComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    ChartsModule
  ],
  providers: [CityService, { provide: LOCALE_ID, useValue: "en-US" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
