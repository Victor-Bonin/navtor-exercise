import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import { Observable } from "rxjs";
import { Vessel } from "../model/Vessel";

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly BASE_API_URL = "https://frontendteamfiles.blob.core.windows.net/exercises/"

  constructor(private http: HttpClient) {
  }
  
  public getVessels(): Observable<Vessel[]> {
    const url = `${this.BASE_API_URL}vessels.json`;
    return this.http.get<Vessel[]>(url)
  }
}