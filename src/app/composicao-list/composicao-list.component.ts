import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Composicao } from '../composicao';
import { ComposicoesService } from '../composicao.service';
import { DataService } from '../aluno-list/data.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-composicao-list',
  templateUrl: './composicao-list.component.html',
  styleUrls: ['./composicao-list.component.css']
})
export class ComposicaoListComponent implements OnInit {

  constructor(private composicoesservice:ComposicoesService,  private router: Router, private dataService: DataService) { }

  composicao : Composicao=new Composicao();
  id_aluno : number;
  alunos: any;
  composicoes: any;
  deleteMessage=false;
  isupdatedcomposicao = false;
  composicoesList :any;
  

  ngOnInit() {
    this.isupdatedcomposicao=false;
    this.alunos = this.dataService.getAluno();
    this.id_aluno = this.dataService.getAluno().aluno_id;
     this.composicoesservice.getComposicaoPorAluno(this.id_aluno)
      .subscribe(
        data => {
          this.composicoes=data           
        },
        error => console.log(error));
    
  }

  composicoesupdateform=new FormGroup({
    composicao_id:new FormControl(),
    peso:new FormControl() ,
    imc:new FormControl(),
    gordura:new FormControl(),
    viceral:new FormControl(),
    musculo:new FormControl(),
    calorias:new FormControl(),
    idade:new FormControl()
  });

  updateComp(updcomp){
    this.composicao=new Composicao(); 
    this.composicao.composicao_id=this.ComposicaoIdUpdate.value;
    this.composicao.peso=this.PesoUpdate.value;
    this.composicao.imc=this.IMCUpdate.value;
    this.composicao.gordura=this.GorduraUpdate.value;
    this.composicao.viceral=this.ViceralUpdate.value;
    this.composicao.musculo=this.MusculoUpdate.value;
    this.composicao.calorias=this.CaloriasUpdate.value;
    this.composicao.idade=this.IdadeUpdate.value;
    
   this.composicoesservice.updateComposicao(this.composicao.composicao_id, this.composicao)
   .subscribe(
    data => {     
      this.isupdatedcomposicao=true;
      this.composicoesservice.getComposicaoList().subscribe(data =>{
        this.composicoes =data
        })
    },
    error => console.log(error));
  }

  deleteComposicao(id: number) {
    this.composicoesservice.deleteComposicao(id)
      .subscribe(
        data => {     
          this.deleteMessage=true;
          this.composicoesservice.getComposicaoPorAluno(this.id_aluno)
          .subscribe(data =>{
            this.composicoes=data
          })
        },
        error => console.log(error));
  }

  updateComposicao(id: number){
    this.composicoesservice.getComposicao(id)
      .subscribe(
        data => {
          this.composicoesList=data           
        },
        error => console.log(error));
  }

  gotToAddComposicaoForm(){
    this.dataService.setAluno(this.alunos);
    this.router.navigate(['/add-composicao'])
      
  }

  get ComposicaoIdUpdate(){
    return this.composicoesupdateform.get('composicao_id');
  }

  get PesoUpdate(){
    return this.composicoesupdateform.get('peso');
  }

  get IMCUpdate(){
    return this.composicoesupdateform.get('imc');
  }

  get GorduraUpdate(){
    return this.composicoesupdateform.get('gordura');
  }

  get ViceralUpdate(){
    return this.composicoesupdateform.get('viceral');
  }

  get MusculoUpdate(){
    return this.composicoesupdateform.get('musculo');
  }

  get CaloriasUpdate(){
    return this.composicoesupdateform.get('calorias');
  }

  get IdadeUpdate(){
    return this.composicoesupdateform.get('idade');
  }

  changeisUpdate(){
    this.isupdatedcomposicao=false;
  }





}
