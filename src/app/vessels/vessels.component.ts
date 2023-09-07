import { Component, OnInit } from '@angular/core';
import { Vessel } from '../model/Vessel';
import { ColDef } from 'ag-grid-community';
import { VesselService } from '../services/vessel.service';

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

  constructor(
    private vesselService: VesselService,
    ) {

  }

  ngOnInit() {
    this.initVessels().then(() => {
      this.initColumnDefs()
    })
  }

  private async initVessels(): Promise<void> {
    this.vessels = await this.vesselService.getVessels() 
  }

  private initColumnDefs(): void {
    const columns = []
    for (let key in this.vessels[0]) {
      columns.push({field: key})
    }
    this.columnDefs = columns
  }
}
