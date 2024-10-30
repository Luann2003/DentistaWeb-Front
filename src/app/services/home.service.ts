import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url = signal(environment.apiUrl)
  
  constructor(private httpClient: HttpClient) { }

  findAll(name: string): Observable<{ content: any[] }> {
    const url = `${this.url()}/clinicas?page=${0}&size=${6}&name=${name}`;
    return this.httpClient.get<{ content: any[] }>(url) 
  }

  findById(id: number): Observable<any>{
    return this.httpClient.get<{ content: any[] }>(this.url() + `/clinicas/${id}`,);

  }


}
