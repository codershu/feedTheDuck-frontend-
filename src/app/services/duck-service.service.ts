import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { duckRecord } from '../models/commonModels';

@Injectable({
  providedIn: 'root'
})
export class DuckServiceService {

  constructor(private http: HttpClient) { }

  // private apiRoute = "https://localhost:5001/duck";
  private apiRoute = "https://feedtheduck-server.azurewebsites.net/duck";

  public addRecord(record: duckRecord){
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.apiRoute}/AddRecord`, record, {headers: httpHeaders});
  }

  public getAllRecords(){
    return this.http.get<any>(`${this.apiRoute}/GetAllRecords`);
  }

  public updateRecord(record: duckRecord){
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.apiRoute}/UpdateRecord`, record, {headers: httpHeaders});
  }

  public deleteRecord(record: duckRecord){
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.apiRoute}/DeleteRecord`, record, {headers: httpHeaders});
  }
}
