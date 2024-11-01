import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  url = signal(environment.apiUrl)

  constructor(private http: HttpClient) {}

  insert(agendamento: any): Observable<any> {
    return this.http.post(`${this.url()}/agendamento`, agendamento);
  }

}
