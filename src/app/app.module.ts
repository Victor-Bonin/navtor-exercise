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
import { AgGridModule } from 'ag-grid-angular';

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
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
