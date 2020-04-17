import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AlunoService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http:HttpClient) { }

  getAlunoList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'alunos-list');
  }

  createAluno(aluno: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'save-aluno', aluno);
  }

  deleteAluno(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-aluno/${id}`, { responseType: 'text' });
  }

  getAluno(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/aluno/${id}`);
  }

  updateAluno(id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update-aluno/${id}`, value);
  }
  
}                                           