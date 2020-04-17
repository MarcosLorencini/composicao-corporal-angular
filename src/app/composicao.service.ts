import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from './aluno';

@Injectable({
  providedIn: 'root'
})

export class ComposicoesService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http:HttpClient) { }

  getComposicaoList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'composicoes-list');
  }

  createComposicao(id: number,  value: any): Observable<object> {
   // return this.http.post(`${this.baseUrl}`+'save-composicao', composicao);
    return this.http.post(`${this.baseUrl}/save-composicao/${id}`, value);
  }

  deleteComposicao(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-composicao/${id}`, { responseType: 'text' });
  }

  getComposicao(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/composicao/${id}`);
  }

  updateComposicao(id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update-composicao/${id}`, value);
  }

  getComposicaoPorAluno(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/composicao-por-aluno/${id}`);
  }

  getComposicoesGerarGraficoUm(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/composicoes-por-coluna-grafico-um/${id}`);
  }

  getComposicoesGerarGraficoDois(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/composicoes-por-coluna-grafico-dois/${id}`);
  }
  
}                                           