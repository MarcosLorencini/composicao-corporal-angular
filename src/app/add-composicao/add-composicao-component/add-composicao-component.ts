import { Component, OnInit } from '@angular/core';
import { ComposicoesService } from 'src/app/composicao.service';
import { Composicao } from 'src/app/composicao';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Aluno } from 'src/app/aluno';
import { DataService } from 'src/app/aluno-list/data.service';
import { AlunoService } from 'src/app/aluno.service';
import { Observable,Subject } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-composicao-component',
  templateUrl: './add-composicao-component.html',
  styleUrls: ['./add-composicao-component.css'],
  
})
export class AddComposicaoComponent implements OnInit {

  inputPeso: any;
  inputImc: any;
  inputGordura: any;
  inputViceral: any;
  inputMusculo: any;
  inputCalorias: any;
  inputIdade: any;
  inputData: any;
  
  onKeyPeso(event: any) {
    this.inputPeso = this.inputPeso.replace(/\D/g,'')
    this.inputPeso = this.inputPeso.replace(/(\d{1})(\d{1,2})$/, "$1.$2")
    this.inputPeso = this.inputPeso.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    this.inputPeso = this.inputPeso.replace(/^(\d)/g,"$1")
  }

  onKeyImc(event: any) {
    if (event.keyCode == 9) {
      return false;
    }
    this.inputImc = this.inputImc.replace(/\D/g,'')
    this.inputImc = this.inputImc.replace(/(\d{1})(\d{1,2})$/, "$1.$2")
    this.inputImc = this.inputImc.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    this.inputImc = this.inputImc.replace(/^(\d)/g,"$1")
  }

  onKeyGordura(event: any) {
    if (event.keyCode == 9) {
      return false;
    }
    this.inputGordura = this.inputGordura.replace(/\D/g,'')
    this.inputGordura = this.inputGordura.replace(/(\d{1})(\d{1,2})$/, "$1.$2")
    this.inputGordura = this.inputGordura.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    this.inputGordura = this.inputGordura.replace(/^(\d)/g,"$1")
  }

  onKeyViceral(event: any) {
    if (event.keyCode == 9) {
      return false;
    }
    this.inputViceral = this.inputViceral.replace(/\D/g,'')
    this.inputViceral = this.inputViceral.replace(/(\d{1})(\d{1,2})$/, "$1.$2")
    this.inputViceral = this.inputViceral.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    this.inputViceral = this.inputViceral.replace(/^(\d)/g,"$1")
  }

  onKeyMusculo(event: any) {
    if (event.keyCode == 9) {
      return false;
    }
    this.inputMusculo = this.inputMusculo.replace(/\D/g,'')
    this.inputMusculo = this.inputMusculo.replace(/(\d{1})(\d{1,2})$/, "$1.$2")
    this.inputMusculo = this.inputMusculo.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    this.inputMusculo = this.inputMusculo.replace(/^(\d)/g,"$1")
  }

  onKeyCalorias(event: any) {
    if (event.keyCode == 9) {
      return false;
    }
   this.inputCalorias = this.inputCalorias.replace(/\D/g,'')
   this.inputCalorias = this.inputCalorias.replace(/^(\d)/g,"$1")
  }

  onKeyIdade(event: any) {
    if (event.keyCode == 9) {
      return false;
    }
    this.inputIdade = this.inputIdade.replace(/\D/g,'')
    this.inputIdade = this.inputIdade.replace(/^(\d)/g,"$1")
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

  saveComposicao(saveComposicao){
    this.composicao=new Composicao();   
    let pesoNumber: number = parseFloat(this.Peso.value);
    this.composicao.peso=pesoNumber;

    let imcNumber: number = parseFloat(this.IMC.value);
    this.composicao.imc = imcNumber;

    let gorduraNumber: number = parseFloat(this.Gordura.value);
    this.composicao.gordura = gorduraNumber;

    let viceraNumber: number = parseFloat(this.Viceral.value);
    this.composicao.viceral = viceraNumber;

    let musculoNumber: number = parseFloat(this.Musculo.value);
    this.composicao.musculo = musculoNumber;

    let caloriasNumber: number = parseFloat(this.Calorias.value);
    this.composicao.calorias = caloriasNumber;

    let idadeNumber: number = parseFloat(this.Idade.value);
    this.composicao.idade = idadeNumber;


    this.composicao.dataMedida= new DatePipe('en-US').transform(this.DataMedida.value, 'dd/MM/yyyy');
    
    console.log(this.composicao.dataMedida);
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
   
  }

  gotToListComposicao(){
    this.router.navigate(['/list-composicao'])
      
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

}
