import { Injectable } from '@angular/core';
import { Aluno } from '../aluno';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private aluno: Aluno;
  
  constructor(){}

  setAluno(aluno: Aluno){
    this.aluno = aluno;
    }

    getAluno() {
        return this.aluno;
      }

  
}
