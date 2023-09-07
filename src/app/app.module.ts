import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VesselsComponent } from './vessels/vessels.component';
import { EmissionsComponent } from './emissions/emissions.component';
import { ApiService } from './services/api.service'
import { VesselService } from './services/vessel.service'
import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { reducer } from './state/application.reducer';


@NgModule({
  declarations: [
    AppComponent,
    VesselsComponent,
    EmissionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatButtonModule,
    HighchartsChartModule,
    StoreModule.forRoot({state: reducer}),
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    VesselService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
