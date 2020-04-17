import { Component, OnInit } from '@angular/core';
import { ComposicoesService } from 'src/app/composicao.service';
import { Composicao } from 'src/app/composicao';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Aluno } from 'src/app/aluno';
import { DataService } from 'src/app/aluno-list/data.service';
import { AlunoService } from 'src/app/aluno.service';
import { Observable,Subject } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-composicao-component',
  templateUrl: './add-composicao-component.html',
  styleUrls: ['./add-composicao-component.css'],
  
})
export class AddComposicaoComponent implements OnInit {

  values = '';

  onKey(event: any) {
    if(event.target.value.lenght > 2 && event.target.value.lenght > 3 ){
      this.values += event.target.value + ' , ';

    }
     // without type info
    console.log(this.values);
  }

  constructor(private composicoesservice: ComposicoesService, private router: Router, private dataService: DataService) { }

  composicao : Composicao=new Composicao();
  submitted = false;
  id_aluno : number;
  alunos: Aluno = new Aluno();
  composicoes: any;
  deleteMessage=false;
  isupdatedcomposicao = false;
  // composicoesList :any;
  

  ngOnInit() {
    // this.isupdatedcomposicao=false;
    this.submitted=false;
    this.alunos = this.dataService.getAluno();
    this.id_aluno = this.alunos.aluno_id
   
    
    //  this.composicoesservice.getComposicaoPorAluno(this.id_aluno)
    //   .subscribe(
    //     data => {
    //       this.composicoes=data           
    //     },
    //     error => console.log(error));
    
  }

  composicoessaveform=new FormGroup({
    peso:new FormControl( ),
    imc:new FormControl(),
    gordura:new FormControl(),
    viceral:new FormControl(),
    musculo:new FormControl(),
    calorias:new FormControl(),
    idade:new FormControl(),
    dataMedida:new FormControl()
  });

  // composicoesupdateform=new FormGroup({
  //   composicao_id:new FormControl(),
  //   peso:new FormControl() ,
  //   imc:new FormControl(),
  //   gordura:new FormControl(),
  //   viceral:new FormControl(),
  //   musculo:new FormControl(),
  //   calorias:new FormControl(),
  //   idade:new FormControl()
  // });

 
  saveComposicao(saveComposicao){
    this.composicao=new Composicao();   
    this.composicao.peso=this.Peso.value;
    this.composicao.imc=this.IMC.value;
    this.composicao.gordura=this.Gordura.value;
    this.composicao.viceral=this.Viceral.value;
    this.composicao.musculo=this.Musculo.value;
    this.composicao.calorias=this.Calorias.value;
    this.composicao.idade=this.Idade.value;
    this.composicao.dataMedida=this.DataMedida.value;
    this.submitted = true;
    this.save();
  }

  save() {
    this.composicoesservice.createComposicao(this.id_aluno, this.composicao)
      .subscribe(
        data => {     
          this.submitted=true;
          this.composicoesservice.getComposicaoPorAluno(this.id_aluno)
          .subscribe(data =>{
            this.composicoes=data
            
          })
        },
        error => console.log(error));
    this.composicao = new Composicao();
    // this.composicoesservice.createComposicao(this.id_aluno, this.composicao)
    //   .subscribe(
    //     data => console.log(data), error => console.log(error));
    // this.composicao = new Composicao();
  }

  gotToListComposicao(){
    //this.dataService.setAluno(this.alunos);
    this.router.navigate(['/list-composicao'])
      
  }

  // updateComp(updcomp){
  //   this.composicao=new Composicao(); 
  //   this.composicao.composicao_id=this.ComposicaoIdUpdate.value;
  //   this.composicao.peso=this.PesoUpdate.value;
  //   this.composicao.imc=this.IMCUpdate.value;
  //   this.composicao.gordura=this.GorduraUpdate.value;
  //   this.composicao.viceral=this.ViceralUpdate.value;
  //   this.composicao.musculo=this.MusculoUpdate.value;
  //   this.composicao.calorias=this.CaloriasUpdate.value;
  //   this.composicao.idade=this.IdadeUpdate.value;
    
  //  this.composicoesservice.updateComposicao(this.composicao.composicao_id, this.composicao)
  //  .subscribe(
  //   data => {     
  //     this.isupdatedcomposicao=true;
  //     this.composicoesservice.getComposicaoList().subscribe(data =>{
  //       this.composicoes =data
  //       })
  //   },
  //   error => console.log(error));
  // }

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

  // updateComposicao(id: number){
  //   this.composicoesservice.getComposicao(id)
  //     .subscribe(
  //       data => {
  //         this.composicoesList=data           
  //       },
  //       error => console.log(error));
  // }

  get ComposicaoId(){
    return this.composicoessaveform.get('composicao_id');
  }

  get Peso(){
    return this.composicoessaveform.get('peso');
  }

  get IMC(){
    return this.composicoessaveform.get('imc');
  }

  get Gordura(){
    return this.composicoessaveform.get('gordura');
  }

  get Viceral(){
    return this.composicoessaveform.get('viceral');
  }

  get Musculo(){
    return this.composicoessaveform.get('musculo');
  }

  get Calorias(){
    return this.composicoessaveform.get('calorias');
  }

  get Idade(){
    return this.composicoessaveform.get('idade');
  }

  get DataMedida() {
    return this.composicoessaveform.get('dataMedida');
  }

  addComposicaoForm(){
    this.submitted=false;
    this.composicoessaveform.reset();
  }

 

  changeisUpdate(){
  this.isupdatedcomposicao=false;
  }

  // get ComposicaoIdUpdate(){
  //   return this.composicoesupdateform.get('composicao_id');
  // }

  // get PesoUpdate(){
  //   return this.composicoesupdateform.get('peso');
  // }

  // get IMCUpdate(){
  //   return this.composicoesupdateform.get('imc');
  // }

  // get GorduraUpdate(){
  //   return this.composicoesupdateform.get('gordura');
  // }

  // get ViceralUpdate(){
  //   return this.composicoesupdateform.get('viceral');
  // }

  // get MusculoUpdate(){
  //   return this.composicoesupdateform.get('musculo');
  // }

  // get CaloriasUpdate(){
  //   return this.composicoesupdateform.get('calorias');
  // }

  // get IdadeUpdate(){
  //   return this.composicoesupdateform.get('idade');
  // }

  

}
