import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DistributionsService {

  constructor(private http: HttpClient) { }
  url: string = 'http://localhost:5000/dist';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  getData(data){
    return this.http.post(this.url, data, this.httpOptions);
  }
}