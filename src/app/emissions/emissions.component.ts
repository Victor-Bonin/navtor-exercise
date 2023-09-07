import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import * as Highcharts from 'highcharts';
import { Emission, EmissionTimeSeriesValue } from '../model/Emission';
import { Store } from '@ngrx/store';
import { StoreData } from '../state/application.reducer';
import { AddEmissionsAction } from '../state/application.action';
import { firstValueFrom, take } from 'rxjs';
import { VesselService } from '../services/vessel.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-emissions',
  templateUrl: './emissions.component.html',
  styleUrls: ['./emissions.component.scss']
})
export class EmissionsComponent implements OnInit {

  public emissions: Emission[] = [];
  public selectedEmission?: Emission;
  public chartOptions: Highcharts.Options = {};
  public updateFlag = false
  Highcharts: typeof Highcharts = Highcharts;

  constructor(
     private apiService: ApiService,
     private vesselService: VesselService,
     private store: Store<{state: StoreData}>
    ) {
  }

  ngOnInit() {
    this.initEmissions().then(() => {
      this.selectedEmission = this.emissions[0]
      this.onSelectEmission();
    })

    this.chartOptions = {
      xAxis: {
        type: 'datetime',
        minorTickInterval: 1
      },
      yAxis: {
        type: 'linear',
      },
      colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
    }
    this.chartOptions.series = [{data: [], type: 'line'},{data: [], type: 'line'},{data: [], type: 'line'},{data: [], type: 'line'},{data: [], type: 'line'}]
  }

  private async initEmissions(): Promise<void> {
    const storedEmissions = (await firstValueFrom(this.store.pipe(take(1))))?.state.emissions
    if (storedEmissions.length) { 
      this.emissions = storedEmissions;
      return 
    }

    const emissions = await firstValueFrom(this.apiService.getEmissions())
    this.emissions = emissions
    const vessels = await this.vesselService.getVessels()
    this.emissions.forEach(emission => 
      emission.name = vessels.find(vessel => vessel.id == emission.id)?.name ?? ''
    )
    this.store.dispatch(AddEmissionsAction({payload: emissions}))
}

  public onSelectEmission() {

    this.chartOptions.series = [
      {
        name: 'CO2 Emissions',
        data: this.getTimeSeriesDataFromKey('co2_emissions'),
        type: 'line'
      },
      {
        name: 'NOx',
        data: this.getTimeSeriesDataFromKey('nox_emissions'),
        type: 'line'
      },
      {
        name: 'SOx',
        data: this.getTimeSeriesDataFromKey('sox_emissions'),
        type: 'line'
      },
      {
        name: 'Methane',
        data: this.getTimeSeriesDataFromKey('ch4_emissions'),
        type: 'line'
      },
      
      {
        name: 'PM',
        data: this.getTimeSeriesDataFromKey('pm_emissions'),
        type: 'line'
      },
  ]
  this.chartOptions.title = {
    text: `${this.selectedEmission?.name} Emissions`
  }
  this.updateFlag = true;
}

public onCheckLogarithmic(change: MatCheckboxChange) {
  this.chartOptions.yAxis = {
    type: change.checked ? 'logarithmic' : 'linear',
    minorTickInterval: change.checked ? 1 : 0
  }
  this.updateFlag = true;
}

public onClickRandomizeColors() {
  if (!this.chartOptions.colors) { return }
  this.chartOptions.colors = this.chartOptions.colors.map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`)
  console.log(this.chartOptions.colors)
  this.updateFlag = true;
}


  private getTimeSeriesDataFromKey(key: keyof EmissionTimeSeriesValue): [number, number][] {
    if (!this.selectedEmission) { this.selectedEmission = this.emissions[0] }
    return this.selectedEmission.timeSeries.map(timeSeriesValue => {
      const date = timeSeriesValue.report_from_utc.getTime()
      return [date, (timeSeriesValue[key] as number)]
    }
  )
  }
}
