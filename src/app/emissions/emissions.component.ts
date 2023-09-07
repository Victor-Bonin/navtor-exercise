import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import * as Highcharts from 'highcharts';
import { Emission, EmissionTimeSeriesValue } from '../model/Emission';

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

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.initEmissions();
    this.chartOptions = {
      title: {
        text: "Les ptits bateaux"
      },
      xAxis: {
        type: 'datetime',
      },
      colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
    }
    this.chartOptions.series = [{data: [], type: 'line'},{data: [], type: 'line'},{data: [], type: 'line'},{data: [], type: 'line'},{data: [], type: 'line'}]

  }

  private initEmissions(): void {
    this.apiService.getEmissions().subscribe((emissions: Emission[]) => {
      this.emissions = emissions
      this.selectedEmission = emissions[0]
      this.onSelectVessel();
  })
}

  public onSelectVessel() {
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

  this.updateFlag = true;
}


  private getTimeSeriesDataFromKey(key: keyof EmissionTimeSeriesValue): [number, number][] {
    if (!this.selectedEmission) { this.selectedEmission = this.emissions[0] }
    return this.selectedEmission.timeSeries.map(timeSeriesValue => {
      // TODO vbo : deserialize as Date or Timestamp in service
      const date = new Date(timeSeriesValue['report_from_utc']).getTime()
      return [date, (timeSeriesValue[key] as number)]
    }
  )
  }
}
