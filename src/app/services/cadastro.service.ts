import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../enviroments/enviroments';
import { Observable } from 'rxjs';
import { Icadastro } from '../components/cadastro/cadastro.component';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  url = signal(environment.apiUrl)

  constructor(
    private route: Router,
    private httpClient: HttpClient
  ) { }

  cadastro(form: any): Observable<Icadastro>{
    return this.httpClient.post<any>(`${this.url()}/clinicas`, form,);
  }

}
