import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import { Observable, catchError, map, of } from "rxjs";
import { Vessel } from "../model/Vessel";
import { Emission } from "../model/Emission";
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly BASE_API_URL = "https://frontendteamfiles.blob.core.windows.net/exercises/"

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    ) {
  }
  
  public getVessels(): Observable<Vessel[]> {
    const url = `${this.BASE_API_URL}vessels.json`;
    return this.http.get<Vessel[]>(url).pipe(
      catchError(this.handleError<Vessel[]>('getVessels', []))
    );
  }

  public getEmissions(): Observable<Emission[]> {
    const url = `${this.BASE_API_URL}emissions.json`;
    return this.http.get<Emission[]>(url).pipe(
      map(emissions => {
        emissions.forEach(e => {
          e.name = ''
          e.timeSeries = e.timeSeries.map(ts => ({
            ...ts, 
            report_to_utc: new Date(ts.report_to_utc),
            report_from_utc: new Date(ts.report_from_utc)
          }))
        })
        return emissions;
      }),
      catchError(this.handleError<Emission[]>('getEmissions', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this._snackBar.open(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}