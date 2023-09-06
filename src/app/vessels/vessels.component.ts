import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Vessel } from '../model/Vessel';
import { ColDef, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-vessels',
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.scss']
})
export class VesselsComponent implements OnInit {

  public vessels: Vessel[] = []

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public columnDefs: ColDef[] = [];

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.initVessels()
  }

  private initVessels(): void {
    this.apiService.getVessels().subscribe((vessels: Vessel[]) => {
      this.vessels = vessels
      this.initColumnDefs()
    })
  }

  public initColumnDefs(): void {
    const columns = []
    for (let key in this.vessels[0]) {
      columns.push({field: key})
    }
    this.columnDefs = columns
  }

  public onGridReady(params: GridReadyEvent) {
    console.log(this.vessels)
  }
}
