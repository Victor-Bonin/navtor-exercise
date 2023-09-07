import {Injectable} from "@angular/core"
import { Observable, catchError, firstValueFrom, map, of, take } from "rxjs";
import { Vessel } from "../model/Vessel";
import { StoreData } from "../state/application.reducer";
import { ApiService } from "./api.service";
import { Store } from "@ngrx/store";
import { AddVesselsAction } from "../state/application.action";


@Injectable({ providedIn: 'root' })
export class VesselService {

  constructor(
    private apiService: ApiService,
    private store: Store<{state: StoreData}>
    ) {
  }
  
  public async getVessels(): Promise<Vessel[]> {
    const storedVessels = (await firstValueFrom(this.store.pipe(take(1))))?.state.vessels
    if (storedVessels.length) {
      return storedVessels;
    }
    const vessels = await firstValueFrom(this.apiService.getVessels())
    this.store.dispatch(AddVesselsAction({payload: vessels}))
    return vessels
  }
}